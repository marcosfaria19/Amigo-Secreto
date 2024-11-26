const express = require("express");
const Draw = require("../models/Draw");
const { performDraw } = require("../utils/performDraw");
const crypto = require("crypto");

const router = express.Router();

// Criar sorteio
router.post("/", async (req, res) => {
  try {
    const { organizerEmail, organizerName, description, participants } = req.body;
    const link = crypto.randomBytes(8).toString("hex");

    const draw = new Draw({
      organizerEmail,  
      organizerName,
      description,
      participants: participants.map(p => ({
        ...p,
        hasJoined: false,
        link: crypto.randomBytes(8).toString("hex")
      })),
      link,
    });
    await draw.save();
    res.status(201).json({ link });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Participar do sorteio
router.post("/:link/participate", async (req, res) => {
  try {
    const { name, email } = req.body;
    const draw = await Draw.findOne({ link: req.params.link });
    if (!draw) return res.status(404).json({ error: "Draw not found" });

    const participant = draw.participants.find((p) => p.name === name);

    if (participant) {
      if (participant.hasJoined) {
        return res.json({
          message: "Already joined",
          email: participant.email,
        });
      } else {
        participant.email = email;
        participant.hasJoined = true;
        await draw.save();

        const resultLink = `/draw/${draw.link}/${participant.link}`;
        // Simulação de envio de email
        console.log(`Enviando link para ${participant.email}: ${resultLink}`);

        return res.json({
          message: "Joined successfully",
          link: resultLink,
        });
      }
    }

    res.status(400).json({ error: "Participant not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Visualizar sorteio por link
router.get("/:link", async (req, res) => { 
  try {
    const draw = await Draw.findOne({ link: req.params.link }); 
    if (!draw) {
      return res.status(404).json({ message: "Sorteio não encontrado" });
    }
    res.json({
      participants: draw.participants.map(p => ({
        name: p.name,
        hasJoined: p.hasJoined
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver resultados
router.get("/:drawId/results/:userResult", async (req, res) => {
  
  try {
    const draw = await Draw.findOne({ link: req.params.drawId });
   
    if (!draw) return res.status(404).json({ error: "Draw not found" });

    const participant = draw.participants.find(p => p.link === req.params.userResult);

    if (!participant) return res.status(404).json({ error: "Participant not found" });

    if (!draw.results || draw.results.length === 0) {
      draw.results = performDraw(draw.participants);

      await draw.save();
    }
    
    
    const result = draw.results.find(r => r.from === participant.name);

    if (!result) return res.status(404).json({ error: "Result not found" });

    res.json({
      giftedPerson: result.to,
      message: draw.description
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reenviar email
router.post("/:link/resend-email", async (req, res) => {
  try {
    const { name } = req.body;
    const draw = await Draw.findOne({ link: req.params.link });
    if (!draw) return res.status(404).json({ error: "Draw not found" });

    const participant = draw.participants.find(p => p.name === name);
    if (!participant) return res.status(404).json({ error: "Participant not found" });

    const resultLink = `/draw/${draw.link}/${participant.link}`;
    // Simulação de envio de email
    console.log(`Reenviando link para ${participant.email}: ${resultLink}`);

    res.json({ message: "Email resent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
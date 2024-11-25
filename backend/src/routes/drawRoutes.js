const express = require("express");
const Draw = require("../models/Draw");
const { performDraw } = require("../utils/performDraw");

const router = express.Router();

// Criar sorteio

router.post("/", async (req, res) => {
  try {
    const { organizerEmail, organizerName, description, participants } = req.body;
    const link = Math.random().toString(36).substring(2, 15);

    const draw = new Draw({
      organizerEmail,  
      organizerName,
      description,
      participants,
      link,
    });
    await draw.save();
    res.status(201).json({ link });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Realizar sorteio
router.post("/:id/draw", async (req, res) => {
  try {
    const draw = await Draw.findOne({ link: req.params.id });
    if (!draw) return res.status(404).json({ error: "Draw not found" });

    if (draw.results.length > 0) {
      return res.status(400).json({ error: "Draw already performed" });
    }

    const results = performDraw(draw.participants);
    draw.results = results;
    await draw.save();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Participar do sorteio
router.post("/:link/participate", async (req, res) => {
  try {
    const { name, email } = req.body;
    const draw = await Draw.findOne({ link: req.params.link }); // Use link ao invés de id
    if (!draw) return res.status(404).json({ error: "Draw not found" });

    const participant = draw.participants.find((p) => p.email === email);
    if (participant) {
      participant.name = name;
      participant.hasJoined = true;
      await draw.save();
      return res.json({ message: "Participation updated" });
    }

    draw.participants.push({ name, email, hasJoined: true });
    await draw.save();
    res.json({ message: "Joined successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Visualizar sorteio por link
router.get("/:link", async (req, res) => { 
  try {
    const draw = await Draw.findOne({ link: req.params.link }); // Busca usando o link
    if (!draw) {
      return res.status(404).json({ message: "Sorteio não encontrado" });
    }
    res.json(draw); // Retorna o sorteio encontrado
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver resultados
router.get("/:id/results", async (req, res) => {
  try {
    const draw = await Draw.findOne({ link: req.params.id });
    if (!draw) return res.status(404).json({ error: "Draw not found" });
    res.json(draw.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


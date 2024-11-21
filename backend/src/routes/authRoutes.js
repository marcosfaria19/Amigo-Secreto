const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth2 Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); 
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;

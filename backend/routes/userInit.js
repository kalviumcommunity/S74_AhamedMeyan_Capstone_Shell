// routes/userInit.js
const express = require("express");
const supabase = require("../supabaseClient");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.post("/initialize", authenticateUser, async (req, res) => {
  const userId = req.user.id;

  const { data: existingStats, error: fetchError } = await supabase
    .from("user_stats")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) return res.status(500).json({ error: fetchError.message });

  if (existingStats) {
    return res.status(200).json({ message: "User already initialized." });
  }

  const { error: insertError } = await supabase
    .from("user_stats")
    .insert({ user_id: userId });

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }


  res.status(201).json({ message: "User initialized successfully." });
});

module.exports = router;

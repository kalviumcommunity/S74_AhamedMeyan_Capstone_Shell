const express = require("express");
const supabase = require("../supabaseClient");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

// PUT /api/user-stats
router.put('/', authenticateUser, async (req, res) => {
  const { coins_earned, total_coins, modules_completed, quiz_accuracy, tasks_completed, hints_used, score } = req.body;
  
  if (req.body && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty" });
  }

  const { data, error } = await supabase
    .from('user_stats')
    .update({
      coins_earned,
      total_coins,
      modules_completed,
      quiz_accuracy,
      tasks_completed,
      hints_used,
      score,
    })
    .eq('user_id', req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  if (!data || data.length === 0) return res.status(404).json({ error: "User stats not found" });

  if (!data || data.length === 0) return res.status(404).json({ error: "User stats not found" });

  res.json(data[0]);
});

module.exports = router;
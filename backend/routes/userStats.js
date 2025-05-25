const express = require("express");
const supabase = require("../supabaseClient");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

// PUT /api/user-stats
router.put('/', authenticateUser, async (req, res) => {
  const { coins_earned, total_coins, modules_completed, quiz_accuracy, tasks_completed, hints_used, score } = req.body;

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

  res.json(data[0]);
});

module.exports = router;
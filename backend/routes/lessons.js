const express = require("express");
const supabase = require("../supabaseClient");
const router = express.Router();

// Get lessons by module
router.get("/module/:moduleId", async (req, res) => {
  const { moduleId } = req.params;
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("lesson_number");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get lesson by ID
router.get("/:lessonId", async (req, res) => {
  const { lessonId } = req.params;
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
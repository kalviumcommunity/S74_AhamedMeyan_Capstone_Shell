const express = require("express");
const supabase = require("../supabaseClient");
const router = express.Router();

// Get lessons by module
router.get("/module/:moduleId", async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", moduleId)
      .order("lesson_number");

    if (error) {
      const err = new Error(error.message);
      err.status = error.code === "PGRST116" ? 404 : 500;
      throw err;
    }

    if (!data || data.length === 0) {
      const err = new Error("Lessons not found");
      err.status = 404;
      throw err;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Get lesson by ID
router.get("/:lessonId", async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .single();

    if (error) {
      const err = new Error(error.message);
      err.status = error.code === "PGRST116" ? 404 : 500;
      throw err;
    }

    if (!data) {
      const err = new Error("Lesson not found");
      err.status = 404;
      throw err;
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

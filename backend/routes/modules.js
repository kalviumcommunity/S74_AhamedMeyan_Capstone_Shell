const express = require("express");
const supabase = require("../supabaseClient");
const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("module_number");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;

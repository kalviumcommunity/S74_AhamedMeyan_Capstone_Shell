const express = require("express");
const supabase = require("../supabaseClient");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("module_number");

    if (error) {
      const err = new Error(error.message);
      err.status = 500;
      throw err;
    }

    res.json(data);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
});

module.exports = router;

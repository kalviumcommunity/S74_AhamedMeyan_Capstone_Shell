// middleware/auth.js
const supabase = require("../supabaseClient");

async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: "Invalid token" });

  req.user = user;
  next();
}

module.exports = authenticateUser;

const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;

    if (req.params.user_id && req.user.id !== req.params.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  });
};

module.exports = authMiddleware;


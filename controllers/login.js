const jwt = require("jsonwebtoken");
require('dotenv').config();

const login = async (req, res, connection) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error during login: ", err);
        return res.sendStatus(500);
      }

      if (results.length === 0) {
        return res.sendStatus(401);
      }

      const user = results[0];
      const token = jwt.sign({ userId: user.id }, process.env.jwtSecretKey);
      return res.json({ token });
    }
  );
};

module.exports = login;

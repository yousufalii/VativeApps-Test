const register = async (req, res, connection) => {
  const { username, password } = req.body;

  connection.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) {
        console.error("Error registering user: ", err);
        return res.sendStatus(500);
      }
      res.sendStatus(201);
    }
  );
};

module.exports = register;

const getTodos = async (req, res, connection) => {
  const userId = req.params.user_id;

  connection.query(
    "SELECT * FROM todo_list WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching todo items: ", err);
        return res.sendStatus(500);
      }

      return res.status(200).json(results);
    }
  );
};

module.exports = getTodos;

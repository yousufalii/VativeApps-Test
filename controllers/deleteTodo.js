const deleteTodos = async (req, res, connection) => {
  const todoId = req.params.id;

  connection.query(
    "DELETE FROM todo_list WHERE id = ?",
    [todoId],
    (err, results) => {
      if (err) {
        console.error("Error deleting todo item: ", err);
        return res.sendStatus(500);
      }

      if (results.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(200);
    }
  );
};

module.exports = deleteTodos;

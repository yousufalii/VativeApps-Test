const updateTodos = async (req, res, connection) => {
  const todoId = req.params.id;
  const { title, description } = req.body;

  connection.query(
    "UPDATE todo_list SET title = ?, description = ? WHERE id = ?",
    [title, description, todoId],
    (err, results) => {
      if (err) {
        console.error("Error updating todo item: ", err);
        return res.sendStatus(500);
      }

      if (results.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(200);
    }
  );
};

module.exports = updateTodos;

const createNewTodo = async (req, res, connection) => {
  const user_id = req.params.user_id;
  const { title, description } = req.body;
  connection.query(
    "INSERT INTO todo_list (user_id, title, description) VALUES (?, ?, ?)",
    [user_id, title, description],
    (err, results) => {
      if (err) {
        console.error("Error creating todo item: ", err);
        return res.sendStatus(500);
      }

      const newTodoId = results.insertId;
      return res.status(201).json({ id: newTodoId });
    }
  );
};

module.exports = createNewTodo;

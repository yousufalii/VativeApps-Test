const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const register = require("../server/controllers/register");
const login = require("../server/controllers/login");
const authMiddleware = require("../server/authMiddlware");
const createNewTodo = require("../server/controllers/createNewTodo");
const getTodos = require("../server/controllers/getTodos");
const updateTodos = require("../server/controllers/updateTodo");
const deleteTodos = require("../server/controllers/deleteTodo");
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "todos_db",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("12345"),
  },
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/register", (req, res) => {
  register(req, res, connection);
});

app.post("/login", (req, res) => {
  login(req, res, connection);
});

app.post("/todos/:user_id", authMiddleware, (req, res) => {
  createNewTodo(req, res, connection);
});

app.get("/todos/:user_id", authMiddleware, (req, res) => {
  getTodos(req, res, connection);
});

app.put("/todos/:user_id/:id", authMiddleware, (req, res) => {
  updateTodos(req, res, connection);
});

app.delete("/todos/:user_id/:id", authMiddleware, (req, res) => {
  deleteTodos(req, res, connection);
});

const httpServer = http.createServer(app);

const io = socketIO(httpServer);

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

httpServer.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

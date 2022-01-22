const todos = require("../models/toDoModel");

module.exports = function (app) {
  app.get("/api/setuptodos", function (req, res) {
    const starterTodos = [
      {
        username: "test",
        todo: "go to supermarket",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test",
        todo: "buy drink",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test",
        todo: "finish course",
        isDone: false,
        hasAttachment: false,
      },
    ];
    todos.create(starterTodos, function (err, results) {
      res.send(results);
    });
  });
};

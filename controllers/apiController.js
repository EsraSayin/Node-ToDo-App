const todos = require("../models/toDoModel");
const bodyparser = require("body-parser");

module.exports = function (app) {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.get("/api/todos/:uname", function (req, res) {
    todos.find({ username: req.params.uname }, function (err, todos) {
      if (err) throw err;
      res.send(todos);
    });
  });

  app.get("/api/todo/:id", function (req, res) {
    todos.findById({ _id: req.params.id }, function (err, todo) {
      if (err) throw err;
      res.send(todo);
    });
  });
  app.post("/api/todo", function (req, res) {
    if (req.body.id) {
      todos.findByIdAndUpdate(
        req.body.id,
        {
          todo: req.body.todo,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment,
        },
        function (err, todo) {
          if (err) throw err;
          res.send("Success");
        }
      );
    } else {
      var newTodo = todos({
        username: "test",
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment,
      });

      newTodo.save(function (err) {
        if (err) throw err;
        res.send("Success");
      });
    }
  });

  app.put("/api/todo/:id", function (req, res) {
    todos.findByIdAndUpdate(
      { _id: req.params.id },
      {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment,
      },
      function (err, todo) {
        if (err) throw err;
        res.send("Success");
      }
    );
  });

  app.delete("/api/todo/:id", function (req, res) {
    todos.findByIdAndRemove({ _id: req.params.id }, function (err) {
      if (err) throw err;
      res.send("Success");
    });
  });
};

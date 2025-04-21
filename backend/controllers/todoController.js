const { validationResult } = require("express-validator");
const Todo = require("../model/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status.json({ message: "server error" });
  }
};

exports.createTodos = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.updateTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.findone({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.title = title;
    todo.description = description;
    todo.isCompleted = isCompleted;
    await todo.save();
  } catch (error) {}
};

const { validationResult } = require("express-validator");
const Todo = require("../model/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status.json({ message: "server error" });
  }
};

exports.createTodos = async (req, res) => {
  console.log(req.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      user: req.user.id,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.findoneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, isCompleted },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = Todo.findOneAndDelete({ _id: id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {}
};

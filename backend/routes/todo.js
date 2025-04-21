const express = require("express");
const { body } = require("express-validator");
const todoController = require("../controllers/todoController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", verifyToken, todoController.getTodos);
router.post(
  "/",
  verifyToken,
  [
    body("title")
      .isLength({ min: 4, max: 100 })
      .withMessage("Title must be between 4 and 100 characters"),
    body("description")
      .isLength({ max: 255 })
      .withMessage("Description must be less than 255 characters"),
  ],
  todoController.createTodos
);
router.patch(
  "/:id",
  verifyToken,
  [
    body("title")
      .isLength({ min: 4, max: 100 })
      .withMessage("Title must be between 4 and 100 characters"),
    body("description")
      .isLength({ max: 255 })
      .withMessage("Description must be less than 255 characters"),
    body("isCompleted")
      .isBoolean()
      .withMessage("isCompleted must be a boolean"),
  ],
  todoController.updateTodo
);

router.delete("/:id", verifyToken, todoController.deleteTodo);

module.exports = router;

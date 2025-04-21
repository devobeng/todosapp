const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password must be at least 8 characters")
      .isLength({ min: 8 }),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password must be at least 8 characters")
      .isLength({ min: 8 }),
  ],
  authController.login
);
module.exports = router;

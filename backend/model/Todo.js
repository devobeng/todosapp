const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.expors = mongoose.model("Todo", TodoSchema);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

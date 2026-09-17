const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const studentRoutes = require("./routes/studentRoutes");
app.use("/api", studentRoutes);
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend MERN đang hoạt động!",
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas kết nối thành công!");

    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error.message);
    process.exit(1);
  });

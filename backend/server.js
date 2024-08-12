import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
  })
  .catch((err) => {
    console.log("Gagal terhubung ke MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

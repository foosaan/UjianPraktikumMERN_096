import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ pesan: "Gagal mengambil todo items", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ pesan: "Gagal menambahkan todo item", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ pesan: "Todo item tidak ditemukan" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ pesan: "Gagal mengupdate todo item", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ pesan: "Todo item tidak ditemukan" });
    }
    res.json({ pesan: "Todo item berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ pesan: "Gagal menghapus todo item", error: error.message });
  }
});

export default router;
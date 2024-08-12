import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true
  },
  deskripsi: {
    type: String,
    trim: true
  },
  selesai: {
    type: Boolean,
    default: false
  },
  tanggalDibuat: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

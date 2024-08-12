const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


app.use(express.json());

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

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notesRoutes = require("./routes/Notes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/quicknotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

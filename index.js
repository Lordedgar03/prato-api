require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const pratoRoutes = require("./routes/pratoRoutes");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/pratos", pratoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor a correr na porta ${PORT}`));
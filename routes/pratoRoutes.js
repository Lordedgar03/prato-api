const express = require("express");
const router = express.Router();
const pratoController = require("../controllers/pratoController");
const multer = require("multer");

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Rotas
router.get("/", pratoController.getAllPratos);
router.get("/:id", pratoController.getPratoById);
router.get("/nome/:nome", pratoController.getPratoByNome);
router.post("/", upload.single("imagem"), pratoController.createPrato);
router.put("/:id", upload.single("imagem"), pratoController.updatePrato);
router.delete("/:id", pratoController.deletePrato);

module.exports = router;

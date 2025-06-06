const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Inicializa o upload
const upload = multer({ storage: storage });

module.exports = upload;

const multer = require("multer");

// Buat instance multer dengan konfigurasi penyimpanan sementara di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;

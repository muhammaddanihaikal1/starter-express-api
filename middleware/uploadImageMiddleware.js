const multer = require("multer");

// Buat instance multer dengan konfigurasi penyimpanan file
const storage = multer.memoryStorage();

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage });

module.exports = upload;

const axios = require("axios");
const FormData = require("form-data");

const uploadImageToImgBB = async (imageBuffer, originalName) => {
  try {
    // Buat objek FormData dan tambahkan parameter-key dan gambar ke dalamnya
    const formData = new FormData();
    formData.append("key", process.env.IMGBB_KEY);
    formData.append("image", imageBuffer, { filename: originalName });

    // Upload gambar ke ImgBB menggunakan axios
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Mengambil URL gambar yang diunggah
    const imageUrl = response.data.data.url;

    // Mengembalikan URL gambar untuk disimpan di dalam database bersama data lainya
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

module.exports = uploadImageToImgBB;

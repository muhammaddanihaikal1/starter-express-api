"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Programs",
      [
        {
          id: "program-sdf1",
          judul: "Program Penebangan Hutan",
          isi: "Penebangan hutan adalah salah satu masalah besar yang mengancam kelestarian alam kita. Kami mengajak Anda untuk bergabung dalam program ini untuk mendukung kampanye perlindungan hutan dan menyelamatkan lingkungan.\n\nBersama-sama, kita dapat melakukan langkah konkret untuk menghentikan penebangan liar dan mengembangkan solusi berkelanjutan bagi kehidupan di planet ini.",
          gambar: "https://i.ibb.co/3vN9Zxf/program-penebangan-hutan.jpg",
          waktu: "Senin, 05 Juni 2023 08:00 - 11:00 WIB",
          link: "https://meet.google.com/123456789",
        },
        {
          id: "program-jd2b",
          judul: "Program Daur Ulang",
          isi: "Daur ulang adalah salah satu cara yang efektif untuk mengurangi sampah dan mengurangi dampak negatif terhadap lingkungan. Bergabunglah dalam program ini dan mari kita bersama-sama melakukan daur ulang untuk menjaga bumi kita.\n\nMelalui program ini, kami akan memberikan pelatihan dan panduan praktis tentang cara mendaur ulang dengan benar serta memperkenalkan konsep lingkungan yang lebih ramah.",
          gambar: "https://i.ibb.co/CBk5WNL/program-daur-ulang.jpg",
          waktu: "Rabu, 07 Juni 2023 09:00 - 12:00 WIB",
          link: "https://meet.google.com/987654321",
        },
        {
          id: "program-k2fm",
          judul: "Program Edukasi Lingkungan",
          isi: "Pendidikan dan kesadaran tentang lingkungan sangat penting dalam upaya menjaga kelestarian alam. Gabunglah dengan program ini dan ikuti sesi edukasi lingkungan kami untuk belajar lebih banyak tentang bagaimana kita dapat menjaga bumi kita.\n\nKami akan membahas topik-topik seperti keanekaragaman hayati, perubahan iklim, polusi, dan langkah-langkah yang dapat kita ambil untuk mendorong perubahan positif dalam kehidupan sehari-hari.",
          gambar: "https://i.ibb.co/h8gHF47/program-edukasi-lingkngan.jpg",
          waktu: "Jumat, 09 Juni 2023 10:00 - 13:00 WIB",
          link: "https://meet.google.com/567891234",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Programs", null, {});
  },
};

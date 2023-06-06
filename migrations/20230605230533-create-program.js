"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Programs", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      judul: {
        type: Sequelize.STRING,
      },
      isi: {
        type: Sequelize.TEXT,
      },
      gambar: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Programs");
  },
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program.init(
    {
      judul: DataTypes.STRING,
      isi: DataTypes.TEXT,
      gambar: DataTypes.STRING,
      waktu: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Program",
      timestamps: false,
    }
  );
  return Program;
};

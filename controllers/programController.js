const Program = require("../models").Program;
const { nanoid } = require("nanoid");
const uploadImageToImgBB = require("../utils/uploadImageToImgBB");
const dayjs = require("dayjs");
require("dayjs/locale/id");

const addProgramController = async (req, res) => {
  try {
    // mengambil data
    const id = "program-" + nanoid(4);
    const { judul, isi, waktu, link } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    // validasi: jika user tidak mengirimkan data news lengkap
    if (!judul || !isi || !waktu || !link) {
      return res.status(400).json({
        status: "error",
        message: "Semua data judul, isi, waktu dan link harus diisi",
      });
    }

    let imageUrl = null;
    // validasi: jika user mengirimkan gambar
    if (imageBuffer) {
      // proses upload gambar ke ImgBB
      imageUrl = await uploadImageToImgBB(imageBuffer, req.file.originalname);
    }

    // buat object program
    const program = {
      id,
      judul,
      isi,
      gambar: imageUrl,
      waktu,
      link,
    };

    // proses insert data
    await Program.create(program);

    // berikan response success
    return res.status(201).json({
      status: "success",
      message: "Program berhasil dibuat",
      data: {
        id,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProgramController = async (req, res) => {
  try {
    // proses ambil semua data
    const program = await Program.findAll();

    // berikan response success
    return res.json({
      status: "success",
      message: "Berhasil mengambil semua program",
      data: {
        program,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProgramByIdController = async (req, res) => {
  try {
    // mengambil id dari req.params.id
    const id = req.params.id;

    // proses mengambil satu data
    const program = await Program.findOne({
      where: {
        id,
      },
    });

    // validasi jika data yang dicari tidak ada
    if (!program) {
      // berikan response error
      return res.status(404).json({
        status: "error",
        message: "Program tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      status: "success",
      message: "Berhasil mengambil satu program",
      data: {
        program,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const editProgramByIdController = async (req, res) => {
  try {
    // mengambil data dari user
    const id = req.params.id;
    const judul = req.body.judul;
    const isi = req.body.isi;
    const waktu = req.body.waktu;
    const link = req.body.link;
    const imageBuffer = req.file ? req.file.buffer : null;

    // cek data di db berdasarkan id
    const program = await Program.findOne({
      where: {
        id,
      },
    });
    // validasi: berikan response error, ketika data yang dicari tidak ada
    if (!program) {
      return res.status(404).json({
        status: "error",
        message: "Program tidak ditemukan",
      });
    }

    let imageUrl = null;
    // validasi: jika user mengirimkan gambar
    if (imageBuffer) {
      // proses upload gambar ke imgbb
      imageUrl = await uploadImageToImgBB(imageBuffer, req.file.originalname);
    }

    // buat object program baru
    let newProgram = {
      judul: judul ? judul : program.judul,
      isi: isi ? isi : program.isi,
      gambar: imageUrl ? imageUrl : program.gambar,
      waktu: waktu ? waktu : program.waktu,
      link: link ? link : program.link,
    };

    // proses update
    await Program.update(newProgram, {
      where: {
        id,
      },
    });

    // berikan response success
    return res.json({
      status: "success",
      message: "Program berhasil dirubah",
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteProgramByIdController = async (req, res) => {
  try {
    // ambil id dari req.params.id
    const id = req.params.id;

    // validasi: cari data berdasarkan id
    const program = await Program.findOne({
      where: {
        id,
      },
    });
    if (!program) {
      // berikan response error
      return res.status(404).json({
        status: "error",
        message: "Program tidak ditemukan",
      });
    }

    // proses hapus
    await Program.destroy({
      where: {
        id,
      },
    });

    // berikan response success
    return res.json({
      status: "success",
      message: "Program berhasil dihapus",
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  addProgramController,
  getProgramController,
  getProgramByIdController,
  editProgramByIdController,
  deleteProgramByIdController,
};

const Tips = require('../models').Tips;
const { nanoid } = require('nanoid');
const uploadImageToImgBB = require('../utils/uploadImageToImgBB');

const addTipsController = async (req, res) => {
  try {
    // mengambil data
    const id = 'tips-' + nanoid(4);
    const judul = req.body.judul;
    const isi = req.body.isi;
    const imageBuffer = req.file ? req.file.buffer : null;

    // validasi: jika user tidak mengirimkan data tips
    if (!judul || !isi) {
      return res.status(400).json({
        status: 'error',
        message: 'Semua data judul dan isi harus diisi',
      });
    }

    let imageUrl = null;
    // validasi: jika user mengirimkan gambar
    if (imageBuffer) {
      // proses upload gambar ke ImgBB
      imageUrl = await uploadImageToImgBB(imageBuffer, req.file.originalname);
    }
    // buat objek new tips
    const tips = {
      id,
      judul,
      isi,
      gambar: imageUrl,
    };

    // proses memasukkan data
    await Tips.create(tips);

    // berikan response success
    return res.status(201).json({
      status: 'success',
      message: 'Tips berhasil dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getTipsController = async (req, res) => {
  try {
    // proses mengambil semua data tips
    const tips = await Tips.findAll();

    // berikan response success
    return res.json({
      status: 'success',
      message: 'Berhasil mengambil semua tips',
      data: {
        tips,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getTipsByIdController = async (req, res) => {
  try {
    // ambil id dari req.params.id
    const id = req.params.id;

    // cari data berdasarkan id
    const tips = await Tips.findOne({
      where: {
        id,
      },
    });

    // validasi: jika tips tidak ditemukan
    if (!tips) {
      // berikan response error
      return res.status(404).json({
        status: 'error',
        message: 'Tips tidak ditemukan',
      });
    }

    // berikan response success
    return res.json({
      status: 'success',
      message: 'Berhasil mengambil satu tips',
      data: {
        tips,
      },
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const editTipsByIdController = async (req, res) => {
  try {
    // mengambil id dari req.params
    const id = req.params.id;
    const judul = req.body.judul;
    const isi = req.body.isi;
    const imageBuffer = req.file ? req.file.buffer : null;

    // cari tips berdasarkan id
    const tips = await Tips.findOne({
      where: {
        id,
      },
    });

    // validasi: jika data tips yang dicari tidak ada
    if (!tips) {
      // berikan response error
      return res.status(404).json({
        status: 'error',
        message: 'Tips tidak ditemukan',
      });
    }

    let imageUrl = null;
    // validasi: jika user mengirimkan gambar
    if (imageBuffer) {
      // proses uplouad gambar ke imgBB
      imageUrl = await uploadImageToImgBB(imageBuffer, req.file.originalname);
    }

    // membuat object tips baru
    const newTips = {
      judul: judul ? judul : tips.judul,
      isi: isi ? isi : tips.isi,
      gambar: imageUrl ? imageUrl : tips.gambar,
    };

    // proses update
    await Tips.update(newTips, {
      where: {
        id,
      },
    });

    // berikan response success
    return res.json({
      status: 'success',
      message: 'Tips berhasil dirubah',
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const deleteTipsByIdController = async (req, res) => {
  try {
    // mengambil id dari req.params.id
    const id = req.params.id;

    // cari data berdasarkan id
    const tips = await Tips.findOne({
      where: {
        id,
      },
    });

    // validasi: jika data tips tidak ditemukan
    if (!tips) {
      return res.status(404).json({
        status: 'error',
        message: 'Tips tidak titemukan',
      });
    }

    // proses hapus
    await Tips.destroy({
      where: {
        id,
      },
    });

    // berikan response success
    return res.json({
      status: 'success',
      message: 'Tips berhasil dihapus',
    });
  } catch (error) {
    // berikan response error
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  addTipsController,
  getTipsController,
  getTipsByIdController,
  editTipsByIdController,
  deleteTipsByIdController,
};

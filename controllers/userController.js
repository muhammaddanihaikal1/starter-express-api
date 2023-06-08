const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  try {
    const { email, nama, password, confPassword } = req.body;

    // validasi: data harus terisi semua
    if (!email || !nama || !password || !confPassword) {
      // berikan response error
      return res.status(400).json({
        status: "error",
        message:
          "Semua data email, nama, password, dan confPassword harus diisi",
      });
    }

    // validasi: jika password != confPassword
    if (password !== confPassword) {
      // berikan reponse error
      return res.status(400).json({
        status: "error",
        message: "password dan confPassword harus sama",
      });
    }

    // validasi: cek apakah email sudah digunakan
    const cekEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (cekEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email sudah digunakan",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // buat object newUser
    const newUser = {
      email,
      nama,
      password: hashPassword,
    };

    // proses insert user
    await User.create(newUser);

    // berikan response success
    return res.status(201).json({
      status: "success",
      message: "Register Berhasil",
      data: {
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    // mengambil data dari req.body
    const { email, password } = req.body;

    // validasi: jika user tidak mengirimkan email dan password
    if (!email || !password) {
      // berikan response error
      return res.status(400).json({
        status: "error",
        message: "Semua data email dan password harus diisi",
      });
    }

    // validasi: cek user di database berdasarkan email
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      // berikan response error
      return res.status(404).json({
        status: "error",
        message: "Email tidak ditemukan",
      });
    }

    // validasi: apakah passwornya = password yang ada di db
    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword) {
      // berikan response error
      return res.status(400).json({
        status: "error",
        message: "Password tidak valid",
      });
    }

    // object payload
    const payload = {
      email,
      nama: user.nama,
    };

    const token = jwt.sign(payload, process.env.LOGIN_TOKEN_KEY, {
      expiresIn: "1h",
    });

    // simpan token di db
    await user.update({ token });

    // berikan response success dan token di header
    return res.header("Authorization", token).json({
      status: "success",
      message: "Login Berhasil",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const logoutUserController = async (req, res) => {
  try {
    // mengambil data token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // validasi: jika tidak ada token
    if (!token) {
      // berikan response error
      return res.status(401).json({
        status: "error",
        message: "Token tidak ditemukan",
      });
    }

    // verifikasi token
    jwt.verify(token, process.env.LOGIN_TOKEN_KEY, async (error, decoded) => {
      if (error) {
        // berikan response error
        return res.status(401).json({
          status: "error",
          message: "Token tidak valid",
        });
      }

      // hapus token di db
      await User.update(
        { token: "" },
        {
          where: {
            email: decoded.email,
          },
        }
      );

      // berikan response success
      return res.json({
        status: "success",
        message: "Logout berhasil",
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};

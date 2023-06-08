const jwt = require("jsonwebtoken");
const User = require("../models").User;

const authenticateTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // validasi: jika token tidak ada
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token tidak ditemukan",
      });
    }

    // validasi: verifikasi dengan token yang ada di db
    const user = await User.findOne({
      where: {
        token,
      },
    });
    if (!user) {
      // berikan response error
      return res.status(401).json({
        status: "error",
        message: "Token tidak valid",
      });
    }

    // verifikasi token
    jwt.verify(token, process.env.LOGIN_TOKEN_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          staus: "error",
          message: "Token tidak valid",
        });
      }

      //   menyimpan data payload jwt
      //   req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = authenticateTokenMiddleware;

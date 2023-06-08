const express = require("express");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/api/register", registerUserController);
userRoute.post("/api/login", loginUserController);
userRoute.post("/api/logout", logoutUserController);

module.exports = userRoute;

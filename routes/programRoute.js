const express = require("express");
const authenticateTokenMiddleware = require("../middleware/authenticateTokenMiddleware");
const {
  addProgramController,
  getProgramController,
  getProgramByIdController,
  editProgramByIdController,
  deleteProgramByIdController,
} = require("../controllers/programController");
const uploadImageMiddleware = require("../middleware/uploadImageMiddleware");

const programRoute = express.Router();

programRoute.post(
  "/api/program",
  uploadImageMiddleware.single("gambar"),
  addProgramController
);
programRoute.get("/api/program", getProgramController);
programRoute.get("/api/program/:id", getProgramByIdController);
programRoute.put(
  "/api/program/:id",
  uploadImageMiddleware.single("gambar"),
  editProgramByIdController
);
programRoute.delete("/api/program/:id", deleteProgramByIdController);

module.exports = programRoute;

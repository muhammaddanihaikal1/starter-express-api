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
  authenticateTokenMiddleware,
  uploadImageMiddleware.single("gambar"),
  addProgramController
);
programRoute.get(
  "/api/program",
  authenticateTokenMiddleware,
  getProgramController
);
programRoute.get(
  "/api/program/:id",
  authenticateTokenMiddleware,
  getProgramByIdController
);
programRoute.put(
  "/api/program/:id",
  authenticateTokenMiddleware,
  uploadImageMiddleware.single("gambar"),
  editProgramByIdController
);
programRoute.delete(
  "/api/program/:id",
  authenticateTokenMiddleware,
  deleteProgramByIdController
);

module.exports = programRoute;

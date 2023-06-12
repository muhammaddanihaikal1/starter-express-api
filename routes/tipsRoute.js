const express = require('express');
const authenticateTokenMiddleware = require('../middleware/authenticateTokenMiddleware');
const { addTipsController, getTipsController, getTipsByIdController, editTipsByIdController, deleteTipsByIdController } = require('../controllers/tipsController');
const uploadImageMiddleware = require('../middleware/uploadImageMiddleware');

const tipsRoute = express.Router();

tipsRoute.post('/api/tips', authenticateTokenMiddleware, uploadImageMiddleware.single('gambar'), addTipsController);
tipsRoute.get('/api/tips', authenticateTokenMiddleware, getTipsController);
tipsRoute.get('/api/tips/:id', authenticateTokenMiddleware, getTipsByIdController);
tipsRoute.put('/api/tips/:id', authenticateTokenMiddleware, uploadImageMiddleware.single('gambar'), editTipsByIdController);
tipsRoute.delete('/api/tips/:id', authenticateTokenMiddleware, deleteTipsByIdController);

module.exports = tipsRoute;

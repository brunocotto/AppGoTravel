const router = require("express").Router();

// importa o controller
const authController = require('../controllers/authController');

// Register User
router.post("/register", authController.register);

// Login User
router.post("/authenticate", authController.authenticate);

// Forgot Password
router.post("/forgot_password", authController.forgot_password);

// Reset Password
router.post("/reset_password", authController.reset_password);

// Exportando as rotas
module.exports = router;
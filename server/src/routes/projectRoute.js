const router = require("express").Router();

// importa o controller
const projectController = require('../controllers/projectController')

// Register User
router.get("/", projectController.teste)

// Exportando as rotas
module.exports = router
const router = require("express").Router();
const authMiddleware = require('../middlewares/auth');

// importa o controller
const projectController = require('../controllers/projectController')

//importa o middleare
router.use(authMiddleware);

// Register User
router.get("/", projectController.teste)

// Exportando as rotas
module.exports = router
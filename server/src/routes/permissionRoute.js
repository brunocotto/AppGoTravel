const router = require("express").Router();
const authMiddleware = require('../middlewares/auth');

// importa o controller
const travelController = require('../controllers/travelController')

//aplica o middleware em todas as rotas
router.use(authMiddleware);

// rota para listagem tarefas
router.get("/", travelController.listTravel)

// rota para criar uma nova viagem
router.post("/", travelController.createTravel)
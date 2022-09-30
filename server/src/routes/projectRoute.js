const router = require("express").Router();
const authMiddleware = require('../middlewares/auth');

// importa o controller
const projectController = require('../controllers/projectController')

//importa o middleare
router.use(authMiddleware);

// rota para listagem tarefas
router.get("/", projectController.listTravel)

// rota para listagem de tarefas por ID
router.get("/:TravelId", projectController.listTravelId)

// rota para criar uma nova viagem
router.post("/", projectController.createTravel)

// Lista tarefas
router.get("/:TravelId", projectController.updateTravelId)

// Exportando as rotas
module.exports = router
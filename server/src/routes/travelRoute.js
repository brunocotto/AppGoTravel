const router = require("express").Router();
const authMiddleware = require('../middlewares/auth');

// importa o controller
const travelController = require('../controllers/travelController')

//adiciona o middleware em todas as rotas
router.use(authMiddleware);

// rota para listagem tarefas
router.get("/", travelController.listTravel)

// rota para listagem de tarefas por ID
router.get("/:TravelId", travelController.listTravelId)

// rota para criar uma nova viagem
router.post("/", travelController.createTravel)

// rota para atualizar uma viagem por ID
router.put("/:TravelId", travelController.updateTravelId)

// rota para deletar uma viagem por ID
router.delete("/:TravelId", travelController.updateTravelId)

// Exportando as rotas
module.exports = router
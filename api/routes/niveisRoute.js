const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router.get('/niveis', NivelController.retornaTodosOsNiveis);
router.get('/niveis/:id', NivelController.retornaNivelPorId);
router.post('/niveis', NivelController.criaNivel);
router.put('/niveis/:id', NivelController.atualizaNivel);
router.delete('/niveis/:id', NivelController.excluiNivel);
router.post('/niveis/:id/restaura', NivelController.restauraNivel);

module.exports = router;

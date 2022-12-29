const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas', TurmaController.retornaTodasAsTurmas);
router.get('/turmas/:id', TurmaController.retornaTurmaPorId);
router.post('/turmas', TurmaController.criaTurma);
router.put('/turma/:id', TurmaController.atualizaTurma);
router.delete('/turma/:id', TurmaController.excluiTurma);

module.exports = router;

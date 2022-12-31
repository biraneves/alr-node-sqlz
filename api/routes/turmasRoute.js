const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas', TurmaController.retornaTodasAsTurmas);
router.get('/turmas/:id', TurmaController.retornaTurmaPorId);
router.post('/turmas', TurmaController.criaTurma);
router.put('/turmas/:id', TurmaController.atualizaTurma);
router.delete('/turmas/:id', TurmaController.excluiTurma);
router.post('/turmas/:id/restaura', TurmaController.restauraTurma);

module.exports = router;

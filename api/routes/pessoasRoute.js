const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.retornaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.retornaPessoaPorId);
router.post('/pessoas', PessoaController.criaPessoa);

module.exports = router;

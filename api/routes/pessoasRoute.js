const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.retornaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.retornaPessoaPorId);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.excluiPessoa);

module.exports = router;

const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.retornaTodasAsPessoas);
router.get('/pessoas/:id', PessoaController.retornaPessoaPorId);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.excluiPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);

router.get(
    '/pessoas/:idEstudante/matriculas/:idMatricula',
    PessoaController.retornaMatricula,
);
router.post('/pessoas/:idEstudante/matriculas', PessoaController.criaMatricula);
router.put(
    '/pessoas/:idEstudante/matriculas/:idMatricula',
    PessoaController.atualizaMatricula,
);
router.delete(
    '/pessoas/:idEstudante/matriculas/:idMatricula',
    PessoaController.excluiMatricula,
);

module.exports = router;

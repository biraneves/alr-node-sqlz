const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.retornaPessoasAtivas);
router.get('/pessoas/todos', PessoaController.retornaTodasAsPessoas);
router.get('/pessoas/inativos', PessoaController.retornaPessoasInativas);
router.get('/pessoas/:id', PessoaController.retornaPessoaPorId);
router.get(
    '/pessoas/matriculas/:idTurma/confirmadas',
    PessoaController.retornaMatriculasPorTurma,
);
router.get(
    '/pessoas/matriculas/lotadas',
    PessoaController.retornaTurmasLotadas,
);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.excluiPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post(
    '/pessoas/:idEstudante/desativa',
    PessoaController.desativaEstudante,
);

router.get(
    '/pessoas/:idEstudante/matriculas',
    PessoaController.retornaMatriculasPorEstudante,
);
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
router.post(
    '/pessoas/:idEstudante/matriculas/:idMatricula/restaura',
    PessoaController.restauraMatricula,
);

module.exports = router;

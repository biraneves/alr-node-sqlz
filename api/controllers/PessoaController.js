const database = require('../models');
const sequelize = require('sequelize');
const { Sequelize } = require('../models');

class PessoaController {
    static criaPessoa = async (req, res) => {
        const novaPessoa = req.body;

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaPessoasAtivas = async (_req, res) => {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaPessoasInativas = async (_req, res) => {
        try {
            const pessoasInativas = await database.Pessoas.scope(
                'inativos',
            ).findAll();
            return res.status(200).json(pessoasInativas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaTodasAsPessoas = async (_req, res) => {
        try {
            const todasAsPessoas = await database.Pessoas.scope(
                'todos',
            ).findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaPessoaPorId = async (req, res) => {
        const { id } = req.params;

        try {
            const pessoa = await database.Pessoas.findOne({
                where: { id: Number(id) },
            });

            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static atualizaPessoa = async (req, res) => {
        const novasInfos = req.body;
        const { id } = req.params;
        try {
            await database.Pessoas.update(novasInfos, {
                where: { id: Number(id) },
            });

            const pessoaAtualizada = await database.Pessoas.findOne({
                where: { id: Number(id) },
            });
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static excluiPessoa = async (req, res) => {
        const { id } = req.params;

        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ message: `Id ${id} excluído.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static restauraPessoa = async (req, res) => {
        const { id } = req.params;

        try {
            await database.Pessoas.restore({ where: { id: Number(id) } });
            return res.status(200).json({ message: `Id ${id} restaurado.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaMatricula = async (req, res) => {
        const { idEstudante, idMatricula } = req.params;

        try {
            const matricula = await database.Matriculas.findAll({
                attributes: [
                    'id',
                    'status',
                    'estudante_id',
                    'turma_id',
                    'createdAt',
                    'updatedAt',
                ],
                where: {
                    id: Number(idMatricula),
                    estudante_id: Number(idEstudante),
                },
            });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static criaMatricula = async (req, res) => {
        const { idEstudante } = req.params;
        const novaMatricula = {
            ...req.body,
            estudante_id: Number(idEstudante),
        };

        try {
            const novaMatriculaCriada = await database.Matriculas.create(
                novaMatricula,
            );
            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static atualizaMatricula = async (req, res) => {
        const { idEstudante, idMatricula } = req.params;
        const novasInfos = req.body;

        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(idMatricula),
                    estudante_id: Number(idEstudante),
                },
            });
            const matricula = await database.Matriculas.findAll({
                attributes: [
                    'id',
                    'status',
                    'estudante_id',
                    'turma_id',
                    'createdAt',
                    'updatedAt',
                ],
                where: {
                    id: Number(idMatricula),
                },
            });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static excluiMatricula = async (req, res) => {
        const { idEstudante, idMatricula } = req.params;

        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(idMatricula),
                },
            });
            return res
                .status(200)
                .json({ message: `Matrícula ${idMatricula} foi excluída.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static restauraMatricula = async (req, res) => {
        const { idEstudante, idMatricula } = req.params;

        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(idMatricula),
                    estudante_id: Number(idEstudante),
                },
            });
            return res
                .status(200)
                .json({ message: `Matrícula ${idMatricula} restaurada.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaMatriculasPorEstudante = async (req, res) => {
        const { idEstudante } = req.params;

        try {
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(idEstudante),
                },
            });
            const matriculas = await pessoa.getAulasMatriculadas({
                attributes: [
                    'id',
                    'status',
                    'estudante_id',
                    'turma_id',
                    'createdAt',
                    'updatedAt',
                ],
            });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaMatriculasPorTurma = async (req, res) => {
        const { idTurma } = req.params;

        try {
            const matriculas = await database.Matriculas.findAndCountAll({
                attributes: [
                    'id',
                    'status',
                    'estudante_id',
                    'turma_id',
                    'createdAt',
                    'updatedAt',
                ],
                where: {
                    turma_id: Number(idTurma),
                    status: 'confirmado',
                },
            });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaTurmasLotadas = async (req, res) => {
        // ! Isto não deveria ser hard coded.
        // TODO: Desenvolver outra solução para definir a quantidade de lotação da turma.
        const lotacaoTurma = 2;

        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                attributes: ['turma_id'],
                where: {
                    status: 'confirmado',
                },
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
            });
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static desativaEstudante = async (req, res) => {
        const { idEstudante } = req.params;

        try {
            database.sequelize.transaction(async (transacao) => {
                await database.Pessoas.update(
                    {
                        ativo: false,
                    },
                    {
                        where: {
                            id: Number(idEstudante),
                        },
                    },
                    {
                        transaction: transacao,
                    },
                );
                await database.Matriculas.update(
                    {
                        status: 'cancelado',
                    },
                    {
                        where: {
                            estudante_id: Number(idEstudante),
                        },
                    },
                    {
                        transaction: transacao,
                    },
                );
                return res.status(200).json({
                    message: `Estudante ${idEstudante} desativado e matrículas canceladas.`,
                });
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = PessoaController;

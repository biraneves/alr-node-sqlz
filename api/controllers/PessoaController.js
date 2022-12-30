const database = require('../models');

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

    static retornaTodasAsPessoas = async (_req, res) => {
        try {
            const todasAsPessoas = await database.Pessoas.findAll();
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
            // const matricula = await database.Matriculas.findAll({
            //     where: {
            //         id: Number(idMatricula),
            //         estudante_id: Number(idEstudante),
            //     },
            // });
            const [results, metadata] = await database.sequelize.query(
                `select * from Matriculas where id = ${Number(
                    idMatricula,
                )} and estudante_id = ${Number(idEstudante)}`,
            );
            return res.status(200).json(results);
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
            const [results, metadata] = await database.sequelize.query(
                `select * from Matriculas where id = ${Number(idMatricula)}`,
            );
            return res.status(200).json(results);
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
}

module.exports = PessoaController;

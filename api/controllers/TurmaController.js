const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {
    static criaTurma = async (req, res) => {
        const novaTurma = req.body;

        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json(novaTurmaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaTodasAsTurmas = async (req, res) => {
        const { data_inicial, data_final } = req.query;
        const where = {};

        data_inicial || data_final ? (where.data_inicio = {}) : null;
        data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
        data_final ? (where.data_inicio[Op.lte] = data_final) : null;

        try {
            const todasAsTurmas = await database.Turmas.findAll({ where });
            return res.status(200).json(todasAsTurmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaTurmaPorId = async (req, res) => {
        const { id } = req.params;

        try {
            const turma = await database.Turmas.findOne({
                where: { id: Number(id) },
            });
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static atualizaTurma = async (req, res) => {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            await database.Turmas.update(novasInfos, {
                where: { id: Number(id) },
            });
            const turmaAtualizada = await database.Turmas.findOne({
                where: { id: Number(id) },
            });
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static excluiTurma = async (req, res) => {
        const { id } = req.params;

        try {
            await database.Turmas.destroy({ where: { id: Number(id) } });
            return res.status(200).json(`Id ${id} excluído.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static restauraTurma = async (req, res) => {
        const { id } = req.params;

        try {
            await database.Turmas.restore({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json({ message: `Turma ${id} restaurada.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = TurmaController;

const database = require('../models');

class NivelController {
    static criaNivel = async (req, res) => {
        const novoNivel = req.body;

        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(200).json(novoNivelCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaTodosOsNiveis = async (req, res) => {
        try {
            const todosOsNiveis = await database.Niveis.findAll();
            return res.status(200).json(todosOsNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static retornaNivelPorId = async (req, res) => {
        const { id } = req.params;

        try {
            const nivel = await database.Niveis.findOne({
                where: { id: Number(id) },
            });
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static atualizaNivel = async (req, res) => {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            await database.Niveis.update(novasInfos, {
                where: { id: Number(id) },
            });
            const nivelAtualizado = await database.Niveis.findOne({
                where: { id: Number(id) },
            });
            return res.status(200).json(nivelAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static excluiNivel = async (req, res) => {
        const { id } = req.params;

        try {
            await database.Niveis.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ message: `Id ${id} excluído.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = NivelController;

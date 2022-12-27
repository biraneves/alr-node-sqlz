const database = require('../models');

class PessoaController {
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
}

module.exports = PessoaController;

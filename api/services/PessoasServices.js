const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    // TODO: criar métodos específicos do controlador de pessoas

    async retornaRegistrosAtivos(where = {}) {
        return database[this.nomeModelo].findAll({ where: { ...where } });
    }

    async retornaRegistrosInativos(where = {}) {
        return database[this.nomeModelo]
            .scope('inativos')
            .findAll({ where: { ...where } });
    }

    async retornaTodosOsRegistros(where = {}) {
        return database[this.nomeModelo]
            .scope('todos')
            .findAll({ where: { ...where } });
    }

    async desativaPessoaEMatriculas(idEstudante) {
        return database.sequelize.transaction(async (transacao) => {
            await super.atualizaRegistro({ ativo: false }, idEstudante, {
                transaction: transacao,
            });
            await this.matriculas.atualizaRegistros(
                { status: 'cancelado' },
                { estudante_id: idEstudante },
                { transaction: transacao },
            );
        });
    }
}

module.exports = PessoasServices;

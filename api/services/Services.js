const database = require('../models');

class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo;
    }

    async retornaTodosOsRegistros() {
        return database[this.nomeModelo].findAll();
    }

    async retornaRegistroPorId(id) {
        // TODO: implementar método
    }

    async criaRegistro(dados) {
        // TODO: implementar método
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeModelo].update(
            dadosAtualizados,
            { where: { id } },
            transacao,
        );
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeModelo].update(
            dadosAtualizados,
            { where: { ...where } },
            transacao,
        );
    }

    async excluiRegistro(id) {
        // TODO: implementar método
    }
}

module.exports = Services;

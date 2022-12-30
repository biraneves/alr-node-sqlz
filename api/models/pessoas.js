'use strict';
module.exports = (sequelize, DataTypes) => {
    const Pessoas = sequelize.define(
        'Pessoas',
        {
            nome: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Dado inválido para o tipo e-mail',
                    },
                },
            },
            role: DataTypes.STRING,
        },
        {
            paranoid: true,
            defaultScope: {
                where: {
                    ativo: true,
                },
            },
            scopes: {
                todos: {
                    where: {},
                },
                inativos: {
                    where: {
                        ativo: false,
                    },
                },
            },
        },
    );
    Pessoas.associate = function (models) {
        Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' });
        Pessoas.hasMany(models.Matriculas, { foreignKey: 'estudante_id' });
    };
    return Pessoas;
};

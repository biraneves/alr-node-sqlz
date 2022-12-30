'use strict';
module.exports = (sequelize, DataTypes) => {
    const Pessoas = sequelize.define(
        'Pessoas',
        {
            nome: {
                type: DataTypes.STRING,
                validate: {
                    funcaoValidadora: (dado) => {
                        if (dado.length < 3)
                            throw new Error(
                                'Nome deve ter 3 ou mais caracteres.',
                            );
                    },
                },
            },
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
        Pessoas.hasMany(models.Matriculas, {
            foreignKey: 'estudante_id',
            scope: { status: 'confirmado' },
            as: 'aulasMatriculadas',
        });
    };
    return Pessoas;
};

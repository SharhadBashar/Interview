'use strict';

module.exports = function(sequelize, DataTypes) {
    var Creator = sequelize.define(
        'Creator',
        {
            firstname: { type: DataTypes.STRING },
            lastname: { type: DataTypes.STRING },
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            underscored: true,
            tableName: 'creator',
        },
    );

    return Creator;
};

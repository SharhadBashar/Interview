'use strict';

module.exports = function(sequelize, DataTypes) {
    var Install = sequelize.define(
        'Install',
        {
            platform: { type: DataTypes.TEXT },
            country: { type: DataTypes.TEXT },
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            underscored: true,
            tableName: 'install',
        },
    );

    return Install;
};
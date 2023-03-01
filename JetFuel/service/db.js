
const os = require('os');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('server_take_home', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: null,
    port: 5432,
    pool: {
        max: parseInt(
            120 /  os.cpus().length,
        ),
        min: 2,
        idle: 10000,
        acquire: 20000,
    },
    retry: {
        match:
            'SequelizeDatabaseError: could not serialize access due to concurrent update',
        max: 3,
    },
});

module.exports = {
    Sequelize,
    sequelize,
};

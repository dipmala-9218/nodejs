const config = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const user = sequelize.define("user", {
    'user_id': {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    'name': {
        type: Sequelize.STRING,
        allowNull: false
    },
    'email': {
        type: Sequelize.STRING,
        allowNull: false
    },
    'password': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'createdAt': Sequelize.DATE
});

sequelize.sync().then(() => {
    console.log('user table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = user;

module.exports = {
    async insertUser(data) {
        return await user.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
    },
    async getUserByUsername(username) {
        const userData = await user.findAll({
            where: {
                email: username
            }
        });

        return userData;
    }
};
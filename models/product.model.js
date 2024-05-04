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

const product = sequelize.define("product", {
    'product_id': {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    'name': {
        type: Sequelize.STRING,
        allowNull: false
    },
    'price': {
        type: Sequelize.STRING,
        allowNull: false
    },
    'description': {
        type: Sequelize.STRING,
        allowNull: false,
    },
    'product_type': {
        type: Sequelize.ENUM('1', '2'),
        allowNull: false,
        defaultValue: '1'
    },
    'product_image': {
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

module.exports = {
    async insertProduct(data) {
        return await product.create({
            name: data.name,
            price: data.price,
            description: data.description,
            product_type: data.type,
            product_image: data.product_image
        });
    },
    async updateProduct(id, data) {
        return await product.update({
            name: data.name,
            price: data.price,
            description: data.description,
            product_type: data.type,
            product_image: data.product_image
        },
        {
            where: {
                product_id: id
            }
        }
        );
    },
    async deleteProduct(id) {
        return await product.destroy({
            where: {
                product_id: id
            }
        });
    },
    async getAll() {
        const users = await product.findAll({
            limit:1
        });
        return users;
    },
    async get(id) {
        const users = await product.findAll({
            where: {
                product_id: id
            }
        });
        return users;
    }
};
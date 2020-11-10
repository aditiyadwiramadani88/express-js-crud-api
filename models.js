const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('nodeapi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const Product = sequelize.define('Product', {
    name_product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    }
}, {
});



const User = sequelize.define('User', {
    username:{
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
})

const data1 = []
exports.db = sequelize
exports.product = Product
exports.user = User
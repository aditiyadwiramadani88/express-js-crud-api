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


const data1 = []



    



exports.db = sequelize
exports.product = Product
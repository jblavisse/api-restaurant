const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 return sequelize.define('order_dish', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }, {
    underscored: true,
    tableName: 'order_dish'
    })
}
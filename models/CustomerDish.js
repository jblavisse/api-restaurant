const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('customer_dish', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }
    }, {
        underscored: true,
        tableName: 'customer_dish'
     })
    
} 
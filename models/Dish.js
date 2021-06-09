const { DataTypes } = require('sequelize');

module.exports = (sequelize) => 
{
    return sequelize.define('Dish',{
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        } 
    },{
        tableName: 'dish',
        underscored:true
    })
}
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => 
{
    return sequelize.define('Order',{
        code:{
            type: DataTypes.STRING(30),
            allowNull:false
        },
        status:{
            type: DataTypes.ENUM,
            values: ['pending', 'cooking', 'finished'],
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        } 
    },{
        tableName: 'order' ,
        underscored:true
    })
}

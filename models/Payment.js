
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => 
{
    return sequelize.define('Payment',{
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
        },{
            tableName: 'payment' ,
            underscored:true
        })
}

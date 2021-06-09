// Récupération de DataTypes dans la librairie sequelize importé par npm
const { DataTypes } = require('sequelize');

// Récupération de l'instance sequelize
module.exports = (sequelize) => 
{
    // Retourne la définition du modèle pour le client
    return sequelize.define('Customer', {
    firstname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(14),
        allowNull: true
    }
}, {
        underscored: true,
        tableName: 'customer'
    })
};
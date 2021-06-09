// Le fichier index.js dans le dossier models
// va servir à l'initialisation de l'ORM
// + à la liaison avec des modèles qui sont dans d'autres fichiers

// Récupérer le paquet de sequelize dans npm
const {Sequelize} = require('sequelize');

// Créer une instance de sequelize avec les paramètres de la BDD
const sequelize = new Sequelize(
    'mysql://restaurant_usr:1poney2poneys3poneys@localhost/restaurant'
);

// Requérir le modèle Customer et on envoie dans ce modèle
// mon instance de sequelize pour pouvoir bien être récupéré
// et lié à mon instance, 
const Customer = require('./Customer')(sequelize);

module.exports = sequelize;
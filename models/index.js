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
const Dish = require('./Dish')(sequelize);
const Order = require('./Order')(sequelize);
const Payment = require('./Payment')(sequelize);
const CustomerDish = require('./CustomerDish')(sequelize);
const OrderDish = require('./OrderDish')(sequelize);

// Un moyen de paiement peut être utilisé dans plusieurs commandes
Payment.hasMany(Order);
// Une commande n'est réglé qu'avec un seul moyen de paiement
Order.belongsTo(Payment);


// Un client peut passer plusieurs commandes
Customer.hasMany(Order);
// Une commande ne peut être passée que par un client
Order.belongsTo(Customer);


// Une commande peut posséder plusieurs plats
Order.belongsToMany(Dish, {through: 
    {model: OrderDish, unique: false}
});
// Un plat peut être dans plusieurs commandes
Dish.belongsToMany(Order, {through: 
    {model: OrderDish, unique: false}
});


// Un client peut commander plusieurs plats
Customer.belongsToMany(Dish, {through: 
    {model: CustomerDish, unique: false}
});
// Un plat peut être lié à plusieurs clients
Dish.belongsToMany(Customer,  {through: 
    {model: CustomerDish, unique: false}
});


module.exports = sequelize;
const {DataTypes, Sequelize} = require('sequelize');

const sequelize = new Sequelize('mysql://restaurant_usr:1poney2poneys3poneys@localhost/restaurant');

console.log(`Checking database connection...`);

const Customer = sequelize.define('Customer', {
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
        allowNull: false
    }
}, {
    underscored: true,
    tableName: 'customer'
})

const Dish = sequelize.define('Dish', {
}, {
    underscored: true,
    tableName: 'dish'
})

const Order = sequelize.define('Order', {
}, {
    underscored: true,
    tableName: 'order'
})

const Payment = sequelize.define('Payment', {
}, {
    underscored: true,
    tableName: 'payment'
})


// Un moyen de paiement peut être utilisé dans plusieurs commandes
Payment.hasMany(Order);
// Une commande n'est réglé qu'avec un seul moyen de paiement
Order.belongsTo(Payment);

// Un client peut passer plusieurs commandes
Customer.hasMany(Order);
// Une commande ne peut être passée que par un client
Order.belongsTo(Customer);


// Créer ma table intermédiaire en many to many
// Pouvoir contrôler la clé primaire, et faire en sorte
// que ce soit un id à nous
// Pouvoir supprimer le createdAt, updatedAt qui est généré
// de base
const OrderDish = sequelize.define('order_dish', {
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

// Une commande peut posséder plusieurs plats
Order.belongsToMany(Dish, {through: OrderDish});
// Un plat peut être dans plusieurs commandes
Dish.belongsToMany(Order, {through: OrderDish});


const CustomerDish = sequelize.define('customer_dish', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
}, {
    underscored: true,
    // timestamps: false, -> Si on veut supprimer le created_at et updated_at
    tableName: 'customer_dish'
 })

// Un client peut commander plusieurs plats
Customer.belongsToMany(Dish, {through: CustomerDish});
// Un plat peut être lié à plusieurs clients
Dish.belongsToMany(Customer, {through: CustomerDish});



sequelize.authenticate()
// Si c'est bon
.then(() => {
 console.log('Database connection OK!');

 // Synchroniser la structure de ma BDD avec mes modèles Sequelize
 sequelize.sync({ force: true })
    .then(() => {
    console.log("Database rewriting done!");
    })
})
// Si c'est pas bon
.catch(err => {
 console.log('Unable to connect to the database:');
 console.log(err.message);
 process.exit();
})
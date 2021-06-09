
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
        allowNull: true
    }
}, {
    underscored: true,
    tableName: 'customer'
});

const Dish = sequelize.define('Dish',{
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
});


const Order = sequelize.define('Order',{
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
});

const Payment = sequelize.define('Payment',{
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    }
},{
    tableName: 'payment' ,
    underscored:true
});

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
Order.belongsToMany(Dish, {through: 
    {model: OrderDish, unique: false}
});
// Un plat peut être dans plusieurs commandes
Dish.belongsToMany(Order, {through: 
    {model: OrderDish, unique: false}
});


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
Customer.belongsToMany(Dish, {through: 
    {model: CustomerDish, unique: false}
});
// Un plat peut être lié à plusieurs clients
Dish.belongsToMany(Customer,  {through: 
    {model: CustomerDish, unique: false}
});



sequelize.authenticate()
// Si c'est bon
.then(() => {
 console.log('Database connection OK!');

 // Synchroniser la structure de ma BDD avec mes modèles Sequelize
 sequelize.sync({ force: true })
    .then(() => {
        console.log("Database rewriting done!");
    
        Customer.create({
            firstname: "Jean-Baptiste",
            lastname: "Lavisse",
            email: "jb@truc.fr",
        //    address: "2 rue du vert gazon 62129 truc",
        //    phone: '0321882292'
        })

        Customer.create({
            firstname: "Jean-jacques",
            lastname: "Rousseau",
            email: "lebg@laphilo.fr",
        //    address: "2 rue du vert gazon 62129 truc",
            phone: '0321882292'
        })
    })

})
// Si c'est pas bon
.catch(err => {
 console.log('Unable to connect to the database:');
 console.log(err.message);
 process.exit();
})
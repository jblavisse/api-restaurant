const sequelize = require("./models/index.js");

console.log(`Checking database connection...`);

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
        //  address: "2 rue du vert gazon 62129 truc",
        //  phone: '0321882292'
        })

        Customer.create({
            firstname: "Jean-jacques",
            lastname: "Rousseau",
            email: "lebg@laphilo.fr",
        //  address: "2 rue du vert gazon 62129 truc",
            phone: '0321882292'
        })
   
        Dish.create({
            name: "Pizza végétarienne",
            description: "Une pizza que même t'as que des légumes dedans",
            price: 13.79
        })

        Dish.create({
            name: "Pizza",
            description: "Une pizza",
            price: 21
        })

        Dish.create({
            name: "Spaghettis à la bolognaise",
            description: "Le plat basique par excellence",
            price: 3.5
        })
    })
})
// Si c'est pas bon
.catch(err => {
 console.log('Unable to connect to the database:');
 console.log(err.message);
 process.exit();
})
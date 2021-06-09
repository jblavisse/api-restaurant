const sequelize = require("./models/index.js");

console.log(`Checking database connection...`);


sequelize.authenticate()
// Si c'est bon
.then(() => {
    console.log('Database connection OK!');
    
    
    // NB: toJSON() enlève les fioritures propres à Sequelize
    // Sur un seul élément, à employer
    // donc dans boucle forEach si plusieurs obtenus
    // par requête

    // Récupérer tous les clients
    // SELECT * from customer;
    Customer.findAll().then(customers => {
        console.log(customers);
    })

    // Récupérer un seul client par clé primaire
    // SELECT * FROM customer WHERE id=3;
    Customer.findByPk(3).then(theCustomer => {
        console.log(theCustomer.toJSON())
    })

    //  Récupérer un client par un champ avec une valeur choisie
    // SELECT * FROM customer WHERE firstname="Jean-Baptiste" LIMIT 1;
    Customer.findOne({
        where: {firstname: "Jean-Baptiste"}
    }).then(theCustomer => {
        console.log(theCustomer.toJSON())
    })


    //  Récupérer tous les clients par un champ avec une valeur choisie
    // SELECT * FROM customer WHERE firstname="Jean-Baptiste";
    Customer.findAll({
        where: {firstname: "Jean-Baptiste"}
    }).then(customers => {
        console.log(customers)
    })


    // Faire en sorte d'afficher tous les plats qui s'appellent exactement "Pizza"
    Dish.findAll({
        where: {name: "Pizza"}
    }).then(dishes => {
        console.log(dishes)
    })

    // Récupérer le plat qui a pour id 2
    Dish.findByPk(2).then(theDish => {
        console.log(theDish)
    })

    // Faire en sorte d'afficher tous les plats dont le prix est  inférieur à 20
    Dish.findAll({
        where: {price: {
            [Op.lt]: 20
        }}
    }).then(dishes => {
        console.log(dishes)
    })
})
// Si c'est pas bon
.catch(err => {
 console.log('Unable to connect to the database:');
 console.log(err.message);
 process.exit();
})
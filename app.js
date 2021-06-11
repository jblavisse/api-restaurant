// Récupère l'instance de sequelize et ses modèles associés
const sequelize = require("./models/index.js");
const express = require("express");

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    sequelize.models.Customer.findAll()
    .then(customers => {
        res.send(customers)
    })
})

// Créer l'url /dishes qui affiche tous les plats
app.get('/dishes',(req,res) => {
    sequelize.models.Dish.findAll()
    .then(dishes => {
        res.status(200).json(dishes)
    })
})

// Créer l'url /dishes/3 qui affiche le plat qui a pour id 3
app.get('/dishes/:id',(req,res) => {
    const id = req.params.id;
    sequelize.models.Dish.findByPk(id)
    .then(dish => {
        res.status(200).json(dish)
    })
})

sequelize.authenticate()
// Si c'est bon
.then(() => {
    console.log('Database connection OK!');
    app.listen(port, () => {
        console.log(`Web server listening at http://localhost:${port}`);
    })
})
// Si c'est pas bon
.catch(err => {
 console.log('Unable to connect to the database:');
 console.log(err.message);
 process.exit();
})
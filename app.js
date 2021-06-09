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
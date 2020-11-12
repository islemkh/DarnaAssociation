import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/Routes/routes';
const app = express();
const PORT =8080 ;
const cors = require('cors');

//connection mongoose :DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DarnaDB',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//bodyparser :midlleware pour passer les informations à la base de données
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
routes(app);
//Port
app.get('/', (req, res) =>
res.send(`serveur node et express sur port ${PORT} `)
);

app.listen(PORT, () =>
console.log(`votre serveur est sur le port ${PORT} `)
);


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/Routes/routes';
const app = express();
<<<<<<< HEAD
const PORT =8080 ;
const cors = require('cors');
=======
const cors = require('cors');
const PORT =8080 ;
var serveStatic = require('serve-static');
var path = require('path');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const fs = require("fs");
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2

//connection mongoose :DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DarnaDB',{
    useUnifiedTopology: true,
    useNewUrlParser: true
<<<<<<< HEAD
});
=======
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)
app.use(serveStatic(path.join(__dirname, 'Darna'), {
  maxAge: '1d',
 // setHeaders: setCustomCacheControl
}));
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2
//bodyparser :midlleware pour passer les informations à la base de données
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(function (req, res, next) {
=======
app.use( (req, res, next) => {
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
<<<<<<< HEAD
=======

  //app.use(express.static(__dirname + '../../views'));
  global.__basedir = __dirname;
 
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2
routes(app);
//Port
app.get('/', (req, res) =>
res.send(`serveur node et express sur port ${PORT} `)
);

app.listen(PORT, () =>
console.log(`votre serveur est sur le port ${PORT} `)
);

<<<<<<< HEAD
module.exports = app
=======
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2

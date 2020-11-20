import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes_demand from './src/Routes/demand_routes';
import routes_member from './src/Routes/member_routes';
import routes_image from './src/Routes/image_routes';

const app = express();
const cors = require('cors');
const PORT = 8080;
var serveStatic = require('serve-static');
var path = require('path');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const fs = require("fs");





//connection mongoose :DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DarnaDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
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
//bodyparser :midlleware pour passer les informations à la base de données
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});

routes_demand(app)
routes_member(app)
routes_image(app)
//app.use(express.static(__dirname + '../../views'));
global.__basedir = __dirname;

//Port
app.get('/', (req, res) =>
  res.send(`serveur node et express sur port ${PORT} `)
);

app.listen(PORT, () =>
  console.log(`votre serveur est sur le port ${PORT} `)
);

module.exports = app

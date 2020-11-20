import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { DemandeSchema } from '../Models/demand';
import { usershema } from '../Models/member';

const bcrypt = require('bcrypt');
const Demand = mongoose.model('Demande', DemandeSchema);
const User = mongoose.model('User', usershema);

//ajouter demande apres registring
export const addNewDemand = (req, res) => {
  let user = Demand.findOne({ Email: req.body.Email }, (err, user) => {
    if (user) {
      res.json({
        "code": "505", "msg": "demand with this email already exist"
      });
    } else {
      let newDemand = new Demand(req.body)
      var password = bcrypt.hashSync(req.body.Password, 10);
      newDemand.Password = password;
      newDemand.save((err, demand) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json({
            //"code": "200",
            message: "demand added successfuly"
          });

        }
      })
    }

  })


}
// addNewUser(newuser)
export const AccepterDemande = (req, res) => {
  var today = Date.now();
  req.body["_id"] = new ObjectID()
  req.body["role"] = "member";
  req.body["statut"] = "actif";
  req.body["Create_date"] = today;

  let newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "code": "206", "msg": "user added successfuly"
      })

    }
  })
}

//get toutes les demandes
export const getAllDemands = (req, res) => {
  Demand.find({}, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });
};

//get demande by id
export const getDemande = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;

  Demand.findOne({
    '_id': ObjectId(id)
  }, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });

};
//supprimer demande
export const deletDemande = (req, res) => {

  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;

  Demand.deleteOne({
    '_id': ObjectId(id)
  }, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });
}
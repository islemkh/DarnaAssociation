import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { usershema } from '../Models/member';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User', usershema);

//member crud
export const addNewMember = (req, res) => {
  let user = User.findOne({ Email: req.body.Email }, (err, user) => {
    if (user) {
      res.json({
        "code": "505", "msg": "member already exist"
      });
    }
    else {
      req.body["role"] = "member";
      req.body["statut"] = "actif";
      let d = new Date().getFullYear();
      let d1 = d + 1
      req.body["Create_date"] = d;

      let newUser = new User(req.body);
      var password = bcrypt.hashSync(req.body.Password, 10);
      newUser.Password = password;
      newUser.save((err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            "code": "200", "msg": "member added successfuly"
          })
        }
      })
    }
  })
};
export const getAllMember = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }

    // console.log(res)
    res.json(user);
  });
};

//affisher details d'un membre
export const getMember = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + id,
      });
    }
    res.status(200).send(user);
    // console.log(user);
  })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + id,
      });
    });
};
export const GetMemberByYear = (req, res) => {
  let date = new Date();
  let Create_date = date.getFullYear();
  console.log(Create_date)
  const createdate = req.params.Create_date;
  console.log(createdate)
  User.find({ 'Create_date': createdate }).then((user) => {
    if (user.Create_date = createdate) {
      res.json(user)
      console.log(user)
    } else {
      return res.status(404).send({
        message: "User not found with statut " + createdate,
      });
    }
  })


};
export const GetMemberByYcurrentYear = (req, res) => {
  let date = new Date();
  let createdate = date.getFullYear();
  console.log(createdate)
  User.find({ 'Create_date': createdate }).then((user) => {
    if (user.Create_date = createdate) {
      user.statut = "archivé";
      // user.statut.save();
      res.json(user.statut)
      console.log(user)
    } else {
      return res.status(404).send({
        message: "User not found with statut " + createdate,
      });
    }
  })


};


//supprimer membre
export const deleteMember = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.deleteOne({ '_id': ObjectId(id) })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found ",
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
};
//modifier member
export const UpdateMember = (req, res) => {
  const id = req.params.id;
  // const ObjectId  = require('mongodb').ObjectID;
  User.findByIdAndUpdate({ _id: id }, req.body, { new: true }, (err, user) => {
    if (err) {
      res.send(err)
    }
    res.json(user)
  }
  )
}
export const updateEtatMember = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) })
    .then((user) => {
      if (user.statut == "actif") {
        user.statut = "banni"
        user.save()
        res.send({ message: "member banni" });
      } 
      else if(user.statut == "banni"){
        user.statut = "actif"
        user.save()
        res.send({ message: "member actif" });
      }
      
      else {
        res.send({ message: "error canno't make this action" });

      }
    })

}

export const RenewMember = (req, res) => {
  const id = req.params.id;
  let date = new Date();
  let Create_date = date.getFullYear();
  console.log(Create_date)
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) })
    .then((user) => {
      if (user.Create_date !== Create_date ) {
        user.Create_date = Create_date
        user.save()
        res.send({ message: "member renouvelé" });
      } else {
        res.send({ message: "error canno't make this action" });

      }
    })
}

//login
export const loginmember = (req, res) => {
  console.log("auth user");
  var password = req.body.Password;
  var email = req.body.Email;
  let user = User.findOne({ Email: email }, function (err, user) {


    if (err) {
      console.log(err)
      res.sendStatus(500);
    }
    if (user) {
      if (bcrypt.compareSync(password, user.Password)) {
        jwt.sign({ user }, 'secretkey', (err, token) => {
          res.json({
            "code": "200", "msg": "login succ",
            token, user
          });

          res.end(token);
        });

      } else {
        res.json({ "code": "204", "msg": "password incorrect" });
      }
    } else {
      res.json({ "code": "204", "msg": "email incorrect" });
    }

  });

};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

};

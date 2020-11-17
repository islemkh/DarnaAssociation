import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import {DemandeSchema,usershema} from'../Models/models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Demand = mongoose.model('Demande', DemandeSchema)
const User=mongoose.model('User',usershema)
 

//ajouter demande apres registring
export const addNewDemand = (req, res) => {
 let user =  User.findOne({ Email:req.body.Email },(err,user) =>{
    if(user){ 
     res.json({
       "code": "505","msg":"member with this email already exist"
     });
    }else{
    let newDemand= new Demand(req.body);
    var password=bcrypt.hashSync(req.body.Password,10);
    newDemand.Password=password;
    newDemand.save((err, demand) => {
       if (err){
res.send(err);
       }else{
        res.status(200).json({
          //"code": "200",
          message:"demand added successfuly"
        });
      
      }

    })}
 
    })


};

export const AccepterDemande = (req, res) => {
  var today = Date.now();
      req.body["_id"]=new ObjectID()
      req.body["role"]="member";
      req.body["statut"]="actif";
      req.body["Create_date"]=today;

      // addNewUser(newuser)
      let newUser= new User(req.body);
      
      newUser.save((err, user) => {
        if (err){
         res.send(err);
        }else{
        res.json({
         "code": "206","msg":"user added successfuly"
       })
       
      }
    });
    // newuser.copyTo(User)
    // User.create({
    //   'NomPrenom':newuser.NomPrenom
    //   stu
    // })
    // console.log(nuser)
    // // neuser._id = new ObjectId(); 
    
    
    }
  
    
 
 
 

//get toutes les demandes

export const getAllDemands = (req, res) => {
    Demand.find({},(err, demand) => {
       if (err){
res.send(err);
       }
res.json(demand);
    });
};

//get demande by id
export const getDemande = (req, res) => {
  const id = req.params.id;
  const ObjectId  = require('mongodb').ObjectID;
  
      Demand.findOne({
        '_id': ObjectId(id)
    },(err, demand) => {
      if (err){
res.send(err);
      }
res.json(demand);
   });
    
};
//supprimer demande
export const deletDemande = (req,res)=>{
  
  const id = req.params.id;
  const ObjectId  = require('mongodb').ObjectID;
  
      Demand.deleteOne({
        '_id': ObjectId(id)
    },(err, demand) => {
      if (err){
res.send(err);
      }
res.json(demand);
   });
}


//login
export const loginmember = (req, res) => {
    console.log("auth user");
   var password=req.body.Password;
   var email=req.body.Email;
    let  user =  User.findOne({ Email:email  },function(err,user){
  
      
       if(err){
         console.log(err)
          res.sendStatus(500);
       }
       if(user){
        if(bcrypt.compareSync(password, user.Password)) {
          jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
              "code": "200","msg":"login succ",
              token ,user
            });
    
            res.end(token);
          });
           
        }else{
           res.json({"code": "204","msg":"password incorrect"});
        }
      }else{
        res.json({"code": "204","msg":"email incorrect"});
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
    if(typeof bearerHeader !== 'undefined') {
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

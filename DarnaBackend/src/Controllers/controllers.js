import mongoose from 'mongoose';
import {DemandeSchema,usershema} from'../Models/models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Demand = mongoose.model('Demande', DemandeSchema)
const User=mongoose.model('User',usershema)
export const addNewDemand = (req, res) => {
  let user =  Demand.findOne({ Email:req.body.Email },(err,user) =>{
     if(user){ 
      res.json({
        "code": "505","msg":"email already exist"
      });
     }else{
     let newDemand= new Demand(req.body);
     var password=bcrypt.hashSync(req.body.Password,10);
     newDemand.Password=password;
     newDemand.save((err, demand) => {
        if (err){
 res.send(err);
        }else{
        res.json({
         "code": "200","msg":"demand added successfuly"
       })
       
       }
 
     })}
  
     })
 
 
 };

export const getAllDemands = (req, res) => {
    Demand.find({},(err, demand) => {
       if (err){
res.send(err);
       }
res.json(demand);
    });
};
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

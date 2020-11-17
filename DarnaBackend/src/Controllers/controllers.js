import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import {DemandeSchema,usershema} from'../Models/models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Demand = mongoose.model('Demande', DemandeSchema);
const User=mongoose.model('User',usershema);
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
var path = require('path');

//connection mongoose :DB

//const  mongoURI = "mongodb://localhost/DarnaDB";
const multer = require("multer");
var FormData = require('form-data'); 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DarnaDB',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});


//upload image
 const uploadFile = require("../middleware/upload");

 export const addimage =  (req, res) => {
   uploadFile(req, res,
   function(err) {
    if(err) {
        return  err;
    }  console.log("Uploaded the file successfully: " + req.file.originalname)
    res.json({name:req.file.originalname,path:req.file.path,id:req.body._id});
})

    
};

  
export const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};




//ajouter demande apres registring
export const addNewDemand = (req, res)=> {

 let user =  Demand.findOne({ Email:req.body.Email },(err,user) =>{
    if(user){ 
     res.json({
       "code": "505","msg":"demand with this email already exist"
     });
    }else{
      let newDemand= new Demand(req.body)
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


}
// addNewUser(newuser)
export const AccepterDemande = (req, res) => {
  var today = Date.now();
      req.body["_id"]=new ObjectID()
      req.body["role"]="member";
      req.body["statut"]="actif";
     req.body["Create_date"]=today; 

      let newUser= new User(req.body);
      
      newUser.save((err, user) => {
        if (err){
         res.send(err);
        }else{
        res.json({
         "code": "206","msg":"user added successfuly"
       })
       
      }
    })
     
    
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
//member crud

export const addNewMember = (req, res) => {
  let user =  User.findOne({ Email:req.body.Email },(err,user) =>{
    if(user){ 
     res.json({
       "code": "505","msg":"member already exist"
     });
    }else{
      req.body["role"]="member";
      req.body["statut"]="actif";
      req.body["Create_date"]=Date.now();;

    let newUser= new User(req.body);
    var password=bcrypt.hashSync(req.body.Password,10);
    newUser.Password=password;
    newUser.save((err, user) => {
       if (err){
res.send(err);
       }else{
       res.json({
        "code": "200","msg":"member added successfuly"
      })
      
      }

    })}
 
    })
};
export const getAllMember =  (req, res) => {
  User.find({},(err,user) => {
    if (err){
res.send(err);
    }
    console.log("this is res liste member")

  // console.log(res)
    res.json(user);


 });
};
//affisher details d'un membre
export const getMember =  (req, res) => {
  const id = req.params.id;
  const ObjectId  = require('mongodb').ObjectID;

  User.findOne({'_id': ObjectId(id)}).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + id,
      });
    }
    res.status(200).send(user);
    console.log(user);
  })
  .catch((err) => {
    return res.status(500).send({
      message: "Error retrieving user with id " + id,
    });
  });
};



//supprimer membre
export const deleteMember = (req, res) => {
const id = req.params.id;
const ObjectId  = require('mongodb').ObjectID;
User.deleteOne({'_id':ObjectId(id) })
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
User.findByIdAndUpdate({_id:id} ,req.body,{new:true}, (err,user) => {
if (err ){
  res.send(err)
}
res.json(user)
}
)
 
    // let user=new User(req.body);
  // User.updateOne({'_id': req.body._id}, user)
   
  //     if (!user) {
  //       return res.status(404).send({
  //         message: "no member found",
  //       });
    
  //     }
  //     user.save((err, user) => {
  //       if (err){
  //        res.send(err);
  //       }else{
  //       res.json({
  //        "code": "206","msg":"user added successfuly"
  //      });
       
  //     }
      
  // });
}
export const BannirMember =(req,res) => {
  const id = req.params.id;
const ObjectId  = require('mongodb').ObjectID;
User.findOne({'_id':ObjectId(id) })
  .then((user) => {
    if (user.statut=="actif") {
     user.statut="banni"
    
    user.save()
    res.send({ message: "member banni" });
  }else  {
    res.send({ message: "error canno't make this action" });
    
  }
})
  
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

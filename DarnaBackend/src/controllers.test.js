//import { ObjectID } from 'mongodb';
import {
  addNewDemand, AccepterDemande,getAllDemands,deletDemande,getMember,BannirMember
} from './Controllers/controllers'
const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");


test ("add New Demand",   () => {
  const data = {
    NomPrenom: "addUser",
    Email: "userToAdd@gmail.com" ,
    Password: "added",
  };
  supertest(app)
    .post('/api/register')
    .send(data)
    .expect(200)
    .then(  (res) => {
      expect(res.body.message).toBe("demand added successfuly");
  });
});


test ("add New Demand with existance mail ",   () => {
const data = {
  NomPrenom: "addUser",
  Email: "brahemabdelkaderr@gmail.com" ,
  Password: "added",
};
supertest(app)
  .post('/api/register')
  .send(data)
  .expect(200)
  .then(  (res) => {
    expect(res.body.message).toBe("demand with this email already exist");
});
});
//////////////////////////////////////////////////////////////////////////////////////

test ("test Accepter Demande",   () => {
  const data = {  
    //_id: new ObjectID(),
    role: "member" ,
    status: "active",
    Create_date : Date.now(), 
  };
  supertest(app)
    .post('/api/acceptDemande')
    .send(data)
    .expect(206)
    .then(  (res) => {
      expect(res.body.message).toBe("user added successfuly");
  });
});
test ("test add New Member",   () => {
const data = {  
 // _id: new ObjectID(),
  role: "member" ,
  status: "active",
  Create_date : Date.now(), 
};
supertest(app)
  .post('/api/AddMember')
  .send(data)
  .expect(200)
  .then( (res) => {
    expect(res.body.message).toBe("member added successfuly");
});
});

//test login member  /////////////////////////////////
test ("test login with incorrect mail  ",   () => {
const data = {  
email : "sdfghgfsh@gmail.com",
password : "gfdhbfg"
};
supertest(app)
  .post('/api/login')
  .send(data)
  .expect(200)
  .then( (res) => {
    expect(res.body.message).toBe("email incorrect");
});
});

//test login member  /////////////////////////////////
test ("test login with incorrect password  ",   () => {
const data = {  
 email : "brahemabdelkaderr@gmail.com",
 password : "gfdhbfg"
 };
 supertest(app)
   .post('/api/login')
   .send(data)
   .expect(200)
   .then( (res) => {
     expect(res.body.message).toBe("password incorrect");
 });
});


//test login member  /////////////////////////////////
test ("test login with correct mail and  password  ",   () => {
const data = {  
 email : "brahemabdelkaderr@gmail.com",
 password : "123456"
 };
 supertest(app)
   .post('/api/login')
   .send(data)
   .expect(200)
   .then( (res) => {
     expect(res.body.message).toBe("login succ");
 });
});

//test bannir member  is noot active  /////////////////////////////////
test ("test Bannir Member is not active",   () => {
const data = {  
 email : "brahemabdelkaderr@gmail.com",
 password : "123456"
 };
 supertest(app)
   .post('/api/login')
   .send(data)
   .expect(200)
   .then( (res) => {
     expect(res.body.message).toBe("error canno't make this action");
 });
});

//test bannir member active  /////////////////////////////////
test ("test Bannir Member  active",   () => {
const data = {  
 email : "brahemabdelkaderr@gmail.com",
 password : "123456",
 status : "active"
 };
 supertest(app)
   .post('/api/login')
   .send(data)
   .expect(200)
   .then( (res) => {
     expect(res.body.message).toBe("member banni");
 });
});


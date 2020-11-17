import {
    addNewDemand, AccepterDemande
} from './Controllers/controllers'

const supertest = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
//const User = require("../user/model/user");


test ("add New Demand",   () => {
  ///////////////////////////////////////// 
    const data = {
      NomPrenom: "addUser",
      Email: "userToAdd@gmail.com" ,
      Password: "added",
    };
  //////////////////////////////////
    supertest(app)
      .post('/api/register')
      .send(data)
      .expect(200)
      .then(  (res) => {
        expect(res.body.message).toBe("demand added successfuly");
    });
});
//////////////////////////////////////////////////////////////////////////////////////



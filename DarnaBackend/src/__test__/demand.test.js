
const supertest = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");


test ("add New Demand",   () => {
  const data = {
    NomPrenom: "addUser",
    Email: "userToAdd@gmail.com" ,
    Password: "added",
  };
  supertest(app)
    .post('/register')
    .send(data)
    .expect(200)
    .then((res) => {
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
  .post('/register')
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
    .post('/acceptDemande')
    .send(data)
    .expect(206)
    .then(  (res) => {
      expect(res.body.message).toBe("user added successfuly");
  });
});

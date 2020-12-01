import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { EventSchema } from '../Models/event';
const Event = mongoose.model('Event', EventSchema);

//Event crud
   
//Add Event
export const addNewEvent = (req, res) => {
  req.body["publish"] = "No";
  let d = new Date().getFullYear();
  req.body["Create_date"] = d;
  let newEvent = new Event(req.body);
  newEvent.save((err, event) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        message: "event added successfully"
      });
    }
  })
}

export const getAllEvents = (req, res) => {
  Event.find({}, (err, event) => {
    if (err) {
      res.send(err);
    }
    console.log("this is res liste event")
    // console.log(res)
    res.json(event);
  });
};
export const GetEventByYear = (req, res) => {
  let date = new Date();
  let Create_date = date.getFullYear();
  console.log(Create_date)
  const createdate = req.params.Create_date;
  console.log(createdate)
  Event.find({ 'Create_date': createdate }).then((event) => {
    if (event.Create_date = createdate) {
      res.json(event)
      console.log(event)
    } else {
      return res.status(404).send({
        message: "User not found with statut " + createdate,
      });
    }
  })


};
export const ParticipateEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => {
      console.log("les participants de cet evenement")
      console.log(event.participants)
      console.log(req.body)
      event.participants.push({ "emailP": req.body.userConnect, "etat": "non valide" });
      event.save();
    })
};

//valider participant
export const ValidateParticipate = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => { 
      event.participants.forEach(function(element) {
        if(element.emailP==req.body.email)
          {
          (element.set({"etat":"valide"}))
          event.save();}
      });
    })
};

//ne pas valider participant
export const NoValidateParticipate = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => { 
      event.participants.forEach(function(element) {
        if(element.emailP==req.body.email)
        {
          (element.set({"etat":"refusé"}))
          event.save();}
          
      });
    })
};

//affisher details d'un event
export const getEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) }).then((event) => {
    if (!event) {
      return res.status(404).send({
        message: "Event not found with id " + id,
      });
    }
    res.status(200).send(event);
    // console.log(event);
  })
    .catch((err) => {
      return res.status(400).send({
        message: "Error retrieving event with id " + id,
      });
    });
};


//supprimer Event
export const deleteEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.deleteOne({ '_id': ObjectId(id) })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found ",
        });
      }
      res.send({ message: "Event deleted successfully!" });
    })
};
//modifier Event
export const UpdateEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndUpdate({ '_id': id }, req.body, { new: true }, (err, event) => {
    if (err) {
      res.send(err)
    }
    res.json(event)
  }
  )
}

export const PublishEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => {
      console.log(event.publish)
      if (event.publish == "No") {
        event.publish = "Yes"
        console.log(' event.publish : ', event.publish);
        event.save()
        res.send({ message: "event publier" });
      } else {
        res.send({ message: "error canno't make this action" });
      }
    })

}
/* 
export const ArchiveEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => {
      console.log(event.archive)
      if (event.archive == "No") {
        event.archive = "Yes"
        console.log(' archiver : ', event.archive);
        event.save()
        res.send({ message: "event Archiver" });
      } else {
        res.send({ message: "error canno't make this action" });
      }
    })

} */


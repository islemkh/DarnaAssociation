import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { EventSchema } from '../Models/event';
const Event = mongoose.model('Event', EventSchema);

//Event crud

//Add Event
export const addNewEvent = (req, res) => {  
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
export const ParticipateEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Event.findOne({ '_id': ObjectId(id) })
    .then((event) => { 
      console.log("les participants de cet evenement")
      console.log(event.participants)
      console.log(req.body)
      event.participants.push({"emailP":req.body.userConnect,"etat":"non valide"});
      event.save();
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


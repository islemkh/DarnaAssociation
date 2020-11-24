import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const EventSchema = new Schema({
    NameEvent: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    DateBeginEvent: {
        type: Date,
        required: true
    },
    DateEndEvent: {
        type: Date,
        required: true
    },
    NumberMember: {
        type: Number,
        required: true
    },
    DateBeginInsc: {
        type: Date,
    },
    DateEndInsc: {
        type: Date,
        required: true
    },
    photo: {
        type: String
    },
    participants: [{emailP: String, etat: String}],
    publish: {
        type: String
    }
}

)
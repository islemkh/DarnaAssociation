import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const DemandeSchema = new Schema({
    NomPrenom: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Tel: {
        type: Number
    },
    DateNaissance: {
        type: Date
    },
    Job: {
        type: String
    },
    Password: {
        type: String,
        required: true
    },
    Create_date: {
        type: String
        //default: Date.now
    },
    photo: {
        type: String
    }
}

)

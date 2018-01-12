const mongoose = require('mongoose');
const { Schema } = mongoose; // equivalent --> const Schema = mongoose.Schema;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String], // Tells mongoose this is array containing list of strings.
    yes: { type: Number, default: 0 }, 
    no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);
const mongoose = require('mongoose');
const { Schema } = mongoose; // equivalent --> const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');


const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    // recipients: [String], // Tells mongoose this is array containing list of strings.
    recipients: [RecipientSchema], // An array of RecipientSchema. A subdocument collection that uses RecipientSchema.
    yes: { type: Number, default: 0 }, 
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date, // When survey sent out.
    lastResponded: Date // Last time someone responded to the survey.
});

mongoose.model('surveys', surveySchema);
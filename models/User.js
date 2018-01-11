const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// Destructure
const { Schema } = mongoose; // equivalent --> const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

// Create model Class to tell mongoose we want to create a new collection called 'users'
// 1st arg is name of the collection hence 'users'
// 2nd arg is the schema
// Mongoose will NOT overwite existing collection only create it if doesnt exist.
// !TIP:  1 arg means we are fetching out of mongoose.
// 2 args means we are loading into mongoose.
mongoose.model('users', userSchema); // Again this loads schema into mongoose.
const express = require('express');
const mongoose = require('mongoose');

// model HAS TO GO BEFORE passport otherwise you wil get this error due to order of operations.
// "MissingSchemaError: Schema hasn't been registered for model "users"."
require('./models/User'); 
require('./services/passport'); // Equivalent to pasting all code here.


// DEV db
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authroutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
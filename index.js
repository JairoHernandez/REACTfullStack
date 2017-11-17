const express = require('express');
const mongoose = require('mongoose');
require('./services/passport'); // Equivalent to pasting all code here.

// DEV db
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authroutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
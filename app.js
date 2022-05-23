const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());

// Routes //
const userRoute = require('./API/Routes/User');
app.use('/User', userRoute);

module.exports = app;
/***** Main starting point of application *****/
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Router');

/***** DB setup *****/
//This creates a db called auth. to change name of db, change the last auth
mongoose.connect('mongodb://localhost:auth/auth', {useNewUrlParser: true});

/***** App setup *****/
//Morgan and bodyparser are middleware in express
//any incoming request will be passed into these by default
app.use(morgan('combined'));
app.use(cors());
//morgan is a logging framework. logs all the avtivity like get, post, put, delete...
app.use(bodyParser.json({type: '*/*'}));
//call router with app
router(app);

/***** Server setup *****/
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);

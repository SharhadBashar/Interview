var express = require('express')
    mongoose = require('mongoose')
    bodyParser = require('body-parser');

var app = express();
var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api', bookRouter)

app.get('/', function(req, res){
    //req is the request sent by client
    //res is the response we send back
    res.send('Welcome to the jungle');
});

app.listen(port, function(){
    console.log("Server running " + port);
});
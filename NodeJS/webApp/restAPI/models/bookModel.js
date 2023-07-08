var moongose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    year: { type: Number },
    genre: { type: String },
    read: { type: Boolean, default: false },
});
//tells mongoose that we have a new model or new schema called book, 
//and we are going to return that in our model.export so in the app.js 
//we now have an instance of the book model
module.exports = mongoose.model('Book', bookModel);
//User model
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

//on save hook, encrypt password. run before saving model
userSchema.pre('save', function(next) {
    const user = this; //get access to usermodel
    //generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err);}
        //hash(encrypt) password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {return next(err);}
            //overwrite password with hash
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {return callback(err);}
        callback(null, isMatch);
    });
}

//Create the model class
const userModel = mongoose.model('user', userSchema);

//Export the model
module.exports = userModel;

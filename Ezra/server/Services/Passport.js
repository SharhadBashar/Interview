//Passport to authenticate users
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local')
const User = require('../Models/User');
const config = require('../config');

//Create local strategy
const localOptions = {usernameField: 'username'};
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
    //verify username and call done with user
    User.findOne({username: username}, function(err, user) {
        if (err) {return done(err);}
        if (!user) {
            return done(null, false);
        }
        //compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) {return done(err);}
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false);
        });
    });
});

//Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT strategy
//payload: decoded JWT token
//done: callback depending on if we were able to authenticate user or not
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //see if user id in payload exists in db
    //if it does, call done with that user object
    //if not call done without a user obejct
    User.findById(payload.sub, function(err, user) {
        if (err) {return done(err, false);}
        if (user) {
            done(null, user);
        } 
        else {
            done(null, false);
        }
    })
    
})

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
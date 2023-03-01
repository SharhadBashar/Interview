//Different routes for the page
const passport = require('passport');
const Authentication = require('./Controllers/Authentication');
const passportService = require('./Services/Passport');

//sessoin = false cause we are using tokens and not cookies
const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    app.post('/signUp', Authentication.signUp);
    app.post('/signIn', requireSignin, Authentication.signIn)
}
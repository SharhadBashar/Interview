const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();


function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      // create user
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected to server');
          const db = client.db(dbName);
          const col = await db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);
          console.log(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          console.log(err);
        }
      }());
    });
  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      }
      else {
        res.redirect('/ejs');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;

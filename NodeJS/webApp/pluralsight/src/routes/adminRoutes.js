const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

function router(someString) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertOne({ test: someString });
          res.json(response);
        } catch (err) {
          console.log(err);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;

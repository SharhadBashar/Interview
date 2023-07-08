const express = require('express');
const bookController = require('../controller/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodReadsService');

function router(someString) {
  const { middleware, getIndex, getById } = bookController(someString);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}


module.exports = router;



function bookController(bookService, someString) {
  function middleware(req, res, next) {
    if (req.user) {
      next();
    }
    else {
      res.redirect('/ejs');
    }
  }
  function getIndex(req, res) {
    res.send(someString);
  }
  function getById(req, res) {
    const { id } = req.params;
    res.send(`hello single book ${id}`);
  }
  return {
    middleware,
    getIndex,
    getById
  };
}

module.exports = bookController;

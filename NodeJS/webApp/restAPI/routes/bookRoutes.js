var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    bookRouter.route('/Books')
        .post(bookController.post)
        .get(bookController.get);
    bookRouter.use('/Books/:id', function(req, res, next){
        Book.findById(req.params.id, function (err, book) {
            if (err) {
                res.status(500);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else{
                res.status(404).send('No book found');
            }
        });
    });
    bookRouter.route('/Books/:id')
        .get(bookController.getById)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.deleteId);
    return bookRouter;
};

module.exports = routes;
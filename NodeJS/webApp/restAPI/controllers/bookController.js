var bookController = function(Book){
    var get = function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500);
            }
            else {
                var returnBooks = [];
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/Books/' + newBook._id;
                    returnBooks.push(newBook);
                    element.link
                });
                res.json(returnBooks);
            }
        });
    }
    var getById = function (req, res) {
        var returnBook = (req.book).toJSON();
        returnBook.links = {};
        returnBook.links.self = 'http://' + req.headers.host + '/api/Books/';
        
        res.json(returnBook);
        
    }

    var post = function (req, res) {
        var book = new Book(req.body);
        console.log(book);
        book.save();
        res.status(201);
        res.send(book);
    }

    var put = function (req, res) {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.year = req.body.year;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if (err){
                res.status(500).send(err);
            }
            else{
                res.json(req.book);
            }
        }); 
    }

    var patch = function (req, res) {
        if(req.body._id){
            delete req.body._id;
        }
        for(var p in req.body){
            req.book[p] = req.body[p];
        }
        req.book.save(function(err){
            if (err){
                res.status(500).send(err);
            }
            else{
                res.json(req.book);
            }
        });
    }

    var deleteId = function(req,res){
        req.book.remove(function(err){
            if (err){
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed');
            }
        });
    }

    return{
        get: get,
        getById: getById,
        post: post,
        put: put,
        patch: patch,
        deleteId: deleteId
    }
}

module.exports = bookController;

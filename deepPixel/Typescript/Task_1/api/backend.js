"use strict";
exports.__esModule = true;
var Hapi = require("hapi");
'use strict';
var server = new Hapi.Server({
    debug: { request: ['error'] },
    host: 'localhost',
    port: 8080,
    routes: {
        cors: {
            origin: ["*"]
        }
    }
});
//
var phrases = {
    phrase: {}
};
//The routes for read, write and delete
server.route([
    //Read method
    {
        method: 'GET',
        path: "/read",
        handler: function (request, h) {
            var fs = require('fs');
            var counter = lineCounter('storage.txt');
            var phrases = {};
            fs.readFile('storage.txt', "utf8", function (err, data) {
                data = data.toString().split('\n');
                for (i = 0; i < data.length; i++) {
                    phrases[i] = data[i];
                }
                var i;
                console.log("{phrases:[");
                for (i = 0; i < data.length - 1; i++) {
                    console.log("{id: " + (i + 1) + "} " + phrases[i]);
                }
                console.log("]}");
            });
            return ("");
        }
    },
    //Write method
    {
        method: "POST",
        path: "/write",
        handler: function (request, h) {
            phrases.phrase = JSON.stringify(request.payload);
            var fs = require('fs');
            fs.appendFile('storage.txt', phrases.phrase + "\r\n", function (err) {
                if (err)
                    throw err;
                var counter = lineCounter('storage.txt');
                var json = '{"id:":' + counter + '}';
                console.log(JSON.parse(json));
            });
            return ("Written to file");
        }
    },
    //Delete method
    {
        method: "DELETE",
        path: "/delete/{lineNum}",
        handler: function (request, h) {
            var fs = require('fs');
            fs.readFile('storage.txt', "utf8", function (err, data) {
                var phrases = {};
                data = data.toString().split('\n');
                for (i = 0; i < data.length - 1; i++) {
                    phrases[i] = data[i];
                }
                fs.writeFile('storage.txt', "", function (err) {
                    if (err)
                        throw err;
                });
                var i;
                if (Number(data.length) >= Number(request.params.lineNum)) {
                    delete phrases[Number(request.params.lineNum) - 1];
                    for (i = 0; i < data.length - 1; i++) {
                        if (i == Number(request.params.lineNum) - 1) {
                            continue;
                        }
                        fs.appendFile('storage.txt', phrases[i] + "\r\n", function (err) {
                            if (err)
                                throw err;
                        });
                    }
                    console.log("Line " + request.params.lineNum + " was successfully deleted");
                }
                else {
                    console.log("Unable to delete");
                }
            });
            return ("");
        }
    }
]);
//Counts the number of lines in storage.txt
function lineCounter(link) {
    var fs = require('fs');
    var contents = fs.readFileSync(link);
    var counter = contents.toString().split('\n').length - 1;
    return counter;
}
//Starts the server
function start() {
    try {
        server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
}
;
start();

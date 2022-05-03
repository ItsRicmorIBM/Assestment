var static = require('node-static');
var http = require('http');

var file = new(static.Server)(__dirname);

http.createServer(function (request, response) {
    
    file.serve(request, response);

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
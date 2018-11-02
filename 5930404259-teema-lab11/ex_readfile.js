var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/' + 'kaokonlakao.txt', 'utf8',
        function(err ,data) {
            res.end(data);
        });
});

var server = app.listen(8000, function() {
    console.log("Example app listening at http://localhost:8000");
});
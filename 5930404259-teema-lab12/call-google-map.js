var request1 = require('request');
var http = require('http');
// var express = require('express');
// var app = express();
var result;

request1.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20Khon%20Kaen&key=AIzaSyClB2Lp-MjJ8OuI941IE7G4PJhOq2PrpiM', (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
    result = JSON.parse(body);
    http.createServer(onRequest).listen(8000);
    console.log('Listening on port 8000');
});

function onRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html ; charset=utf-8' });
    res.write('<h2>Restaurants in Khon Kaen</h2>');
    res.write('<ol>');
    // for(var i=0; i<result.results.length; i++) {

    // }
    var allPlace = result.results;
    for (var i = 0; i < allPlace.length; i++) {
        var eachPlace = result.results[i];
        res.write('<li>')
        res.write(eachPlace['name']);
        res.write('</li>');
    }
    res.write('</ol>');
    res.end();
}

// app.get('/', function(err, res) {
//     res.end('ssss');
// });

// var server = app.listen(8080, function() {
//     console.log('Listening on port 8080');
// });
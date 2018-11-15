var request1 = require('request');
var http = require('http');
var fs = require('fs');
var result;

const cssFile = __dirname + '/style.css';

const intro = '<html><head>';
const verse = '<title>Direction from Khon Kaen to Bangkok</title>';
var chorus = '';

fs.readFile(cssFile, 'ASCII', function(err, data) {
    if (err)
        console.error('style.css is missing. None of style applied to the page');
    else {
        console.log('style.css is applied to the page.');
        chorus = '<style>' + data + '</style>';
    }  
});


const solo = '</head><body>';
const outro = '</body></html>';

request1.get('https://maps.googleapis.com/maps/api/directions/json?origin=Khon%20Kaen&destination=Bangkok&key=AIzaSyClB2Lp-MjJ8OuI941IE7G4PJhOq2PrpiM', (error, response, body) => {
    // console.log(response);
    if (error) {
        return console.dir(error);
    }
    result = JSON.parse(body);
    if (result.routes.length == 0) {
        if (result.error_message != null) {
            console.error(result.error_message);
        }
        console.log("There's no direction.");
        console.log(result.status);
        return null;
    }
    http.createServer(onRequest).listen(8000);
    console.log('Listening on port 8000');
});

function onRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html ; charset=utf-8' });
    res.write(intro);
    res.write(verse);
    res.write(chorus);
    res.write(solo);

    res.write('<h2>Directions from Khon Kaen to Bangkok</h2>');
    res.write('<ol>');

    var steps = result.routes[0].legs[0].steps;

    for (var i = 0; i < steps.length; i++) {
        var eachStep = steps[i];
        var instructions = '<p>' + eachStep.html_instructions + '</p>';
        var distance = '<p class="kilometer">(' + eachStep.distance.text + ')</p>';
        res.write('<li>');
        res.write(instructions);
        res.write(distance);
        res.write('</li>');
    }
    res.write('</ol>');
    res.write(outro);
    res.end();
}
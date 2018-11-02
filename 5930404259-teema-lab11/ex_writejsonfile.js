const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const fs = require('fs');
const file = 'data.json';

var obj = {
        'name': 'CM',
        'courses': [
            '198330',
            '198371'
        ],
        'places': {
            'residence': 'Khon Kaen',
            'visits': [
                'Songkla',
                'Bangkok'
            ]
        }
    };

jsonfile.writeFile(file, obj)
    .catch(error => console.error(error));

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/' + 'data.json', 'utf8',
        function(err, data) {
            data = JSON.parse(data);
            res.send(data);
            console.log('=== The values of the second course and the residence ===');
            console.log('Studying ' + data.courses[1] + ' living in ' + data.residence);
        });
});

var server = app.listen(8081, function() {
    console.log("Listening at http://localhost:8081/");
})
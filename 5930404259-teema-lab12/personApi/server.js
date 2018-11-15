var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    mongoose = require('mongoose'),
    Person = require('./api/models/pModel'), // created model loading here
    bodyParser = require('body-parser');

// mongoose insatnce connection url connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PersonDB');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/pRoute'); // importing route
routes(app); // register the route

app.listen(port);
console.log('Person RESTful API started on :' + port);
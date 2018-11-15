'use strict';

var mongoose = require('mongoose'),
    Person = mongoose.model('Persons')

exports.listAllPersons = function(req, res) {
    Person.find({}, function(err, person) {
        if(err)
            res.send(err)
        res.json(person)
    })
}

exports.createPerson = function(req, res) {
    var newPerson = new Person(req.body);
    newPerson.save(function(err, person) {
        if(err)
            res.send(err)
        res.json(person)
    })
}

exports.viewPerson = function(req, res) {
    Person.findById(req.params.personId, function(err, person) {
        if(err)
            res.send(err)
        res.json(person)
    })
}

exports.updatePerson = function(req, res) {
    Person.findOneAndUpdate({
        _id: req.params.personId
    }, req.body, {new: true},
    function(err, person) {
        if(err)
            res.send(err)
        res.json(person)
    })
}

exports.deletePerson = function(req, res) {
    Person.findOneAndDelete({
        _id: req.params.personId
    }, function(err, person) {
        if(err)
            res.send(err)
        var msg = 'Successfully delete ' + person.name
        res.json({ message: msg })
    })
}
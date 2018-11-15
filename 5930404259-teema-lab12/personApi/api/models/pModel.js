'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PersonSchema = new Schema({
    country: {
        type: String,
        default: 'Thailand'
    },
    name: {
        type: String,
        required: 'Please enter the name of person'
    },
    weight: {
        type: String,
        required: 'Please enter the weight of person'
    }
})

module.exports = mongoose.model('Persons', PersonSchema)
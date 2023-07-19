const mongoose = require('mongoose')

const zooanimalSchema = new mongoose.Schema({
    animaltype: {
        type: String,
        required: true
    },
    animalname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ZooAnimal', zooanimalSchema)
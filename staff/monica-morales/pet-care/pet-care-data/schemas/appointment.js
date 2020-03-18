const { Schema, Types: { ObjectId } } = require('mongoose')
const pet = require ('./pet')


module.exports = new Schema({
    dateCreate: {type: Date, default: new Date},
    description: { type: String, required: true },
    dateAppointment: { type: Date, required: true },
    hour: { type: String, required: true } 
})
const { Schema, Types: { ObjectId } } = require('mongoose')
const pet = require ('./pet')

//TO DO pet ????


module.exports = new Schema({
    // petChip: {type: String, ref: Pet}
    dateCreate: {type: Date, default: new Date},
    description: { type: String, required: true },
    dateAppointment: { type: Date, required: true },
    hour: { type: String, required: true } 
})
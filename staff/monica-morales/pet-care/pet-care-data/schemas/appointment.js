const { Schema, Types: { ObjectId } } = require('mongoose')
const pet = require ('./pet')


module.exports = new Schema({
    dateCreate: {type: Date, required: true},
    description: { type: String, required: true },
    dateEmpointment: { type: Date, required: true },
    hour: { type: String, required: true },
    pet: [pet]
})
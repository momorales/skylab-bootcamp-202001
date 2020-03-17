const { Schema, Types: { ObjectId } } = require('mongoose')
const Pet = require ('./pet')


module.exports = new Schema({
    dateCreate: {type: Date, required: true},
    dateEmpointment: { type: Date, required: true },
    description: { type: String, required: true, unique: true },
    hour: { type: String, required: true },
    pet: [Pet]
})
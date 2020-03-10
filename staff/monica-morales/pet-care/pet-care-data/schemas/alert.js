const { Schema, Types: { ObjectId } } = require('mongoose')
const Pet = require ('./pet')


module.exports = new Schema({
    description: { type: String, required: true, unique: true },
    sender: { type: String, unique: true },
    addressee: { type: String, unique: true },
    type: { type: String, unique: true },
    telephone: { type: String, unique: true },
    dateCreate: {type: Date, required: true},
    dateEvent: {type: Date, required: true},
    subject: { type: String, unique: true },
    pet: [Pet]
})
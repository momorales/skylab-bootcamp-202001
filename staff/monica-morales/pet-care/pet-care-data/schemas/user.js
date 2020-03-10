const { Schema, Types: { ObjectId } } = require('mongoose')
const Pet = require ('./pet')
const Alert = require ('./alert')


module.exports = new Schema({
    rol: {enum:['user','vet']},
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tlf: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true},
    DNI: { type: String, required: true},
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    pets: [Pet],
    alerts: [Alert]
})
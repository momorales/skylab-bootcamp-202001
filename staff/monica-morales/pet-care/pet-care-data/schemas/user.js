const { Schema, Types: { ObjectId } } = require('mongoose')
const pet = require ('./pet')
const alert = require ('./alert')


module.exports = new Schema({
    rol: { type: String, enum:['user','vet'], default: 'user', required: true},
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    tlf: { type: Number },
    password: { type: String},
    address: { type: String},
    DNI: { type: String},
    created: { type: Date, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    pets: [{type: ObjectId, ref: 'Pet'}],
    alerts: [alert]
        
})
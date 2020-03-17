const { Schema, Types: { ObjectId } } = require('mongoose')
const diagnostic = require ('./diagnostic')
const appointment = require ('./appointment')

module.exports = new Schema({
    numberChip: {type: String, required: true},
    owner: {type: ObjectId, required: true, ref: 'User'},
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    specie: { type: String, required: true },
    sex: { type: String, required: true },
    race: { type: String, required: true },
    typeRace: { type: String, required: true},
    fur: { type: String, required: true},
    sterilized: { type: Boolean, required: true},
    weight: {type: Number},
    created: { type: Date, required: true, default: Date.now },
    diagnostics: [diagnostic],
    appointments: [appointment]
})


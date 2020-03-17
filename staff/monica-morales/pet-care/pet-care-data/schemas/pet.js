const { Schema, Types: { ObjectId } } = require('mongoose')
const Diagnostic = require ('./diagnostic')



module.exports = new Schema({
    NumberChip: {type: String, required: true},
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    specie: { type: String, required: true, unique: true },
    sex: { type: String, required: true, unique: true },
    race: { type: String, required: true },
    typeRace: { type: String, required: true},
    fur: { type: String, required: true},
    sterilized: { type: Boolean, required: true},
    weight: {type: Number},
    created: { type: Date, required: true, default: Date.now },
    diagnostic: [Diagnostic]
})
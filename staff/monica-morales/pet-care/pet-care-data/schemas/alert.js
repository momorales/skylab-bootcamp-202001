const { Schema, Types: { ObjectId } } = require('mongoose')
// const pet = require ('./pet')

module.exports = new Schema({
    subject: {enum: ['vaccines', 'deworming', 'medication']},
    description: { type: String, required: true },
    telephone: { type: String},
    creation: {type: Date, required: true, default: new Date},
    EventDate: {type: Date, required: true},
    pets: [{type: ObjectId, ref: 'Pet'}]
})
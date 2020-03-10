const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    lab: { type: String, required: true },
    dateCreate: {type: Date, required: true},
})
const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    name: { type: String },
    test: { type: String },
    description: { type: String},
    lab: { type: String },
    dateCreate: {type: Date, required: true, default: new Date},
})
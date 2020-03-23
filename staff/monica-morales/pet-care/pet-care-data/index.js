const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

module.exports = {
    models: require('./models'),
    mongoose,
    ObjectId
}
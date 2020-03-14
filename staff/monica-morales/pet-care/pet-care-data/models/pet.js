const {model}=require('mongoose')
const {pet}=require('../schemas')

module.exports = model('Pet', pet)
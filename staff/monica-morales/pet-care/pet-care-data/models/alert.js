const {model}=require('mongoose')
const {alert}=require('../schemas')

module.exports = model('Alert', alert)
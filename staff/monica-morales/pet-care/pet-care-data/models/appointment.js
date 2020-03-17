const {model}=require('mongoose')
const {appointment}=require('../schemas')

module.exports = model('Appointment', appointment)
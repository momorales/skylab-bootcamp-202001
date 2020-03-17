const {model}=require('mongoose')
const {diagnostic}=require('../schemas')

module.exports = model('Diagnostic', diagnostic)
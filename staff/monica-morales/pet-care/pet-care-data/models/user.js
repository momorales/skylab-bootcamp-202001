const {model}=require('mongoose')
const {user}=require('../schemas')

module.exports = model('User', user)

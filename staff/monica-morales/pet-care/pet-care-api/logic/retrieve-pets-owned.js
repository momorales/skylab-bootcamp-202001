const { validate } = require('pet-care-utils')
const { models: {  User } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = async (id) => {

    const user = await User.findById(id).populate('pets').lean()
   
    return user.pets
}
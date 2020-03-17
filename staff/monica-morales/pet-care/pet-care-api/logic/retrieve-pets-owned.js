const { validate } = require('pet-care-utils')
const { models: {  User } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = id => {

    validate.string(id, 'id')

    return (async()=>{

        const user = await User.findById(id).populate('pets').lean()
   
    return user.pets

    })()
}
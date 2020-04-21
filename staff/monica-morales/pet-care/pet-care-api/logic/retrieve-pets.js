const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * retrieve all pets
 * 
 * @param {string} id veterian's unique id number (veterian)
 * 
 * @returns {Promise<string>} returns pets
 * 
 * @throws {NotFoundError} when user is not exists 
 */

module.exports = (id) => {

    validate.string(id, 'id')

    //id es del veterinario
    

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const pets = await Pet.find().lean()
        
        return pets

    })()
}


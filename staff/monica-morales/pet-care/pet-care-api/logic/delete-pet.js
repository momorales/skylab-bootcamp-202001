const { validate } = require('pet-care-utils')
const { models: { Pet, User }, ObjectId } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * Deletes a pet from "my pets" section
 * 
 * @param {string} id user's unique id number (owner)
 * @param {string} idPet pet unique id pet's number (pet)
 * 
 * @returns {Promise<string>} returns an empty Promise on a successful pet removal
 * 
 * @throws {NotFoundError} when user or pet is not exists
 */

module.exports = (id, idPet) => {

    validate.string(id, 'id')
    validate.string(idPet, 'idPet')

    return (async()=>{

    const user = await User.findById(id)

    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    const index = user.pets.findIndex(pet => pet._id.toString() === idPet)

    if(index === -1) throw new NotFoundError(`pet with id ${idPet} not found`)

    user.pets.splice(index,1)

    await user.save()
    
    const pet = await Pet.findById(idPet)
    
    if(!pet) throw new NotFoundError(`pet with id ${idPet} not found`)

    await Pet.findByIdAndRemove({"_id": idPet})

    })()
}
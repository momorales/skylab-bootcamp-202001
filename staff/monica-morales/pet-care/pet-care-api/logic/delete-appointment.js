const { validate } = require('pet-care-utils')
const { models: { Pet, User }, ObjectId } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * Deletes a appointment from "calendary" section
 * 
 * @param {string} idAppointment apppintment's unique id number 
 * @param {string} idPet pet unique id pet's number (pet)
 * @param {string} id user's unique id number (owner)
 * 
 * @returns {Promise<string>} update user and remove the appointment
 * 
 * @throws {NotFoundError} when user or pet is not exists
 */

module.exports = (idAppointment, idPet, id) => {

    validate.string(id, 'id')
    validate.string(idAppointment, 'appointment')
    validate.string(idPet, 'idPet')

    return (async()=>{

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)
    
    const pet = await Pet.findById(idPet)
    
    if(!pet) throw new NotFoundError(`pet with id ${idPet} not found`)

    await Pet.updateOne({_id: ObjectId(idPet)}, {$pull: {appointments: {_id: ObjectId(idAppointment)}}})

    })()
}


const { validate } = require('pet-care-utils')
const { models: { Alert, Pet, User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * Creates a new alert
 * 
 * @param {string} subject alert's subject
 * @param {string} description alert's description information
 * @param {string} hour alert's hour
 * @param {Date} creation alert's date creation
 * @param {Date} eventDate alert's date event
 * @param {string} petId pet unique id pet's number (pet)
 * @param {string} userId owner pet unique id user's number (owner)

 * 
 * @returns {Promise<string>} returns an empty Promise on a successful alert creation
 * 
 * @throws {NotFoundError} if the user or pet does not exist
 */


module.exports = (subject, description, hour, creation, eventDate, petId, userId) => {

    validate.string(subject, 'subject')
    validate.string(description, 'description')
    validate.string(hour, 'hour')
    validate.type(eventDate, 'eventDate', Date)
    validate.string(petId, 'petId')
    validate.string(userId, 'userId')

    return (async () => {


        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const pet = await Pet.findById(petId)
        if (!pet) {
            throw new NotFoundError(`pet with id ${petId} does not exist`)
        }

       
        const alert = new Alert({ subject, description, hour, creation, eventDate })

        alert.pets = petId

        await User.update({ _id: userId }, { $push: { alerts: alert } })
    })()
}
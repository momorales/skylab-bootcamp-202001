const { validate } = require('pet-care-utils')
const { models: { Pet, User }, ObjectId } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * Deletes a alert from "alerts" section
 * 
 * @param {string} id user's unique id number (owner)
 * @param {string} eventDate alert's date of event
 * 
 * @returns {Promise<string>} update user and remove the alert 
 * 
 * @throws {NotFoundError} when user is not exists
 */

module.exports = (id, eventDate) => {

    validate.string(id, 'id')
    validate.type(eventDate, 'eventDate', Date)
    
    return (async()=>{

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    await User.updateOne({_id: ObjectId(id)},{$pull: {alerts: {eventDate: eventDate}}})
   

    })()
}


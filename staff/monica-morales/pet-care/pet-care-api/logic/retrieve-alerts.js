
const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * retrieve all user's alerts 
 * 
 * @param {string} id user's unique id number (owner)
 * 
 * @returns {Promise<string>} returns user's alerts
 * 
 * @throws {NotFoundError} when user has not alerts
 */

module.exports = id => {

    validate.string(id, 'id')
    
    const newDate = new Date
   
    return User.find({"_id":id, "alerts.eventDate": { "$gte" : newDate}},{alerts:1}).populate("alerts.pets").exec()
        .then(alerts => {
            if (!alerts) throw new NotFoundError(`no alerts for this user`)
            return alerts
            
        })
}

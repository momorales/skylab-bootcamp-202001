const { validate } = require('pet-care-utils')
const { models: {  User } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')


/**
 * retrieve detail of an alert from "alerts" section
 * 
 * @param {string} id user's unique id number (owner)
 * @param {string} idAlert alert unique id alert's number (alert)
 * 
 * @returns {Promise<string>} returns an alert
 * 
 * @throws {NotFoundError} when user has not alerts
 */


module.exports =  (id, idAlert) => {

    validate.string(id, 'id')
    validate.string(idAlert, 'idAlert')
    
    return User.find({"_id":id, "alerts._id": idAlert},{alerts:1})
        .then(alerts => {
            if (!alerts) throw new NotFoundError(`user with id ${id} has not alerts`)
            return alerts
        })
}
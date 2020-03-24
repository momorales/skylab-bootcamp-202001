const { validate } = require('pet-care-utils')
const { models: {  User } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports =  (id, idAlert) => {

    validate.string(id, 'id')
    validate.string(idAlert, 'idAlert')
    
    return User.find({"_id":id, "alerts._id": idAlert},{alerts:1})
        .then(alerts => {
            if (!alerts) throw new NotFoundError(`user with id ${id} has not alerts`)
            return alerts
        })
}
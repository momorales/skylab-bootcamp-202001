
const { validate } = require('pet-care-utils')
const { models: { User } } = require('pet-care-data')
const { NotFoundError, NotAllowedError } = require('pet-care-errors')

module.exports = id => {
    validate.string(id, 'id')

    const newDate = new Date

    return User.find({"_id":id, "alerts.eventDate": { "$gte" : newDate}},{alerts:1})
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            return user
        })

        
}

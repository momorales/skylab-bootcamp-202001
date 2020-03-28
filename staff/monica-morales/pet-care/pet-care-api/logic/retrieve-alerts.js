
const { validate } = require('pet-care-utils')
const { models: { User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = id => {debugger

    validate.string(id, 'id')

    const newDate = new Date

    return User.find({"_id":id, "alerts.eventDate": { "$gte" : newDate}},{alerts:1})
        .then(alerts => {
            if (!alerts) throw new NotFoundError(`no alerts for this user`)
            return alerts
        })
}

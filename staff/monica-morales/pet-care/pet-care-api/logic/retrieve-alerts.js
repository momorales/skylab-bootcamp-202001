
const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = id => {

    validate.string(id, 'id')
    
    const newDate = new Date
   
    return User.find({"_id":id, "alerts.eventDate": { "$gte" : newDate}},{alerts:1}).populate("alerts.pets").exec()
        .then(alerts => {debugger
            if (!alerts) throw new NotFoundError(`no alerts for this user`)
            return alerts
            
        })
}

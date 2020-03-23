
const { validate } = require('pet-care-utils')
const { models: { User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (id, idAlert) => {

    validate.string(id, 'id')

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const newDate = new Date
        debugger

        // return User.find({"_id":idAlert, "alerts.eventDate": { "$gte" : newDate}},{alerts:1})
        //     .then(alerts => {
        //         if (!alerts) throw new NotFoundError(`user with id ${id} does not exist`)

        //         return alerts
        //     })
        //     .then(alerts => alerts)

        const alerts = await User.find({ _id: id }, { alerts: { $elemMatch: { _id: idAlert } } })
            // .then(alert => {
            //     if (alert) return alert
            //     else throw new NotFoundError(`alert with id ${idAlert} does not exist`)
            // })

        return alerts
    })()

}
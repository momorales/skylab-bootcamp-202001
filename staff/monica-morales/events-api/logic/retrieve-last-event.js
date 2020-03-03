const { models: {Event} } = require('../data')
const { NotFoundError } = require('../errors')
module.exports = () => {
    // const events = database.collection('events')
    const now = new Date
    return Event.find({ date : {$gt: now }})
        .then(event => {
            if (!event.length) throw new NotFoundError(`There are no events coming soon`)
            return event
        })
}
const { validate} = require('../utils')
const {models: {Event}} = require('../data')
const {NotFoundError} = require('../errors')


module.exports = id => {

    validate.string(id, 'id')

    return Event.find({ publisher: id })
        .then(result => {

            if (!result) throw new NotFoundError('event not found')
            return result
        })
}
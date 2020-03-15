const { validate } = require('pet-care-utils')
const { models: {  Alert} } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = async (id) => {

    validate.string(id, 'id')

    const alert = await Alert.findById(id)

    if(alert) return alert
    else{
        throw new NotAllowedError (`alert with id ${id} does not exist`)
    }
}
const { validate } = require('pet-care-utils')
const { models: {  Alert} } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports =  id => {

    validate.string(id, 'id')

    return (async()=>{

    const alert = await Alert.findById(id)

    if(alert) return alert
    else{
        throw new NotFoundError (`alert with id ${id} does not exist`)
    }
    })()
}
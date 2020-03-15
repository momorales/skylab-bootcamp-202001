const { validate } = require('pet-care-utils')
const { models: { Pet } } = require('pet-care-data')
const { NotFoundError, NotAllowedError } = require('pet-care-errors')

module.exports = () => {
    
    const newDate = new Date

    return Pet.find({"appointment.dateEmpointment": { "$gte" : newDate}},{appointment:1})
        .then(res=>{
            if (res) return res
            else throw new NotFoundError(`user with id ${id} does not exist`)
        })
    }

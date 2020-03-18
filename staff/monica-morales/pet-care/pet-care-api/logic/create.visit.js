const { validate } = require('pet-care-utils')
const { models: { Pet, Appointment } } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (description, dateAppointment, hour, petId) =>{
   
    validate.string(description, 'description')
    validate.type(dateAppointment, 'dateAppointment', Date)
    validate.string(hour, 'hour')

    return (async()=>{
        
    const pet =  await Pet.findById(petId)

        if(!pet) {
            throw new NotAllowedError (`pet with id ${petId} does not exist`)
        }

    const newVisit = new Appointment({description, dateAppointment, hour})
   
   
    await Pet.update({ _id: petId}, {$push:{appointments: newVisit}})
    
    return newVisit
    
    })()
}

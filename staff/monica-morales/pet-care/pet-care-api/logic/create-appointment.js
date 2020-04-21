const { validate } = require('pet-care-utils')
const { models: { User, Pet, Appointment } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

/**
 * Creates a new appointment
 * 
 * @param {string} description appointment's description information
 * @param {Date} dateAppointment appointment's date event
 * @param {string} hour appointment's hour
 * @param {string} petId pet unique id pet's number (pet)
 * @param {string} id owner pet unique id user's number (owner)
 * 
 * @returns {Promise<string>} returns id of new appointment
 * 
 * @throws {NotFoundError} if the user or pet does not exist
 */

module.exports = (description, dateAppointment, hour, petId, id) =>{
   
    validate.string(description, 'description')
    validate.type(dateAppointment, 'dateAppointment', Date)
    validate.string(hour, 'hour')
    validate.string(id, 'id')
    validate.string(petId, 'petId')

    return (async()=>{

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

        
    const pet =  await Pet.findById(petId)

    if(!pet) throw new NotFoundError (`pet with id ${petId} does not exist`)

    const newVisit = new Appointment({description, dateAppointment, hour})
   
    pet.appointments.push(newVisit)
    

    await pet.save()

        
    return newVisit.id
    
    })()

}


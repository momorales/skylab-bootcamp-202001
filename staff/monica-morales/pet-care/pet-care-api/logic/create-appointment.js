const { validate } = require('pet-care-utils')
const { models: { User, Pet, Appointment } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

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

    // await Pet.update({ _id: petId}, {$push:{appointments: newVisit}})
    
    
    return newVisit.id
    
    })()

}


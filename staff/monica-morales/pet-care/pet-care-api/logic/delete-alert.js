const { validate } = require('pet-care-utils')
const { models: { Pet, User }, ObjectId } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (id, eventDate) => {

    validate.string(id, 'id')
    validate.type(eventDate, 'eventDate', Date)
    
    return (async()=>{

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    await User.updateOne({_id: ObjectId(id)},{$pull: {alerts: {eventDate: eventDate}}})
    
    // const pet = await Pet.findById(idPet)
    
    // if(!pet) throw new NotFoundError(`pet with id ${idPet} not found`)

    // await Pet.updateOne({_id: ObjectId(idPet)}, {$pull: {appointments: {_id: ObjectId(idAppointment)}}})

    })()
}


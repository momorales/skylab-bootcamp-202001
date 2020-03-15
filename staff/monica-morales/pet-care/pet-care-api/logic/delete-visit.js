const { validate } = require('pet-care-utils')
const { models: { Appointment, Pet} } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')

module.exports = async(idAppointment, idPet) => {
  
    validate.string(idAppointment, 'appointment')
    
    const deleteAppointment = await Pet.update({_id:idPet}, {$pull: {appointments: {_id: idAppointment}}})
    Pet.findByIdAndDelete(idAppointment)
    return deleteAppointment

}


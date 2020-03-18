const { validate } = require('pet-care-utils')
const { models: { Pet} } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (idAppointment, idPet) => {
  
    validate.string(idAppointment, 'appointment')
    validate.string(idPet, 'idPet')

    return (async()=>{
    
    const deleteAppointment = await Pet.update({_id:idPet}, {$pull: {appointments: {_id: idAppointment}}})
    Pet.findByIdAndDelete(idAppointment)
    
    return deleteAppointment

    })()
}


const { validate } = require('pet-care-utils')
const { models: { Alert, Pet, User} } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')

/*@params {idUSer, idPet, subject, description, telephone,creation, EventDate}*/
/*buscar bd si el usuario existe*/
/*si no existe lanzamos un error*/
/*si existe: 
    crear alerta con un create con los campos que necesito
    devolver alerta?*/


module.exports = async (subject, description, telephone, creation, eventDate, petId, userId) => {
    
    validate.string(subject, 'subject'),
    validate.string(description, 'description'),
    validate.string(telephone, 'telephone'),
    validate.type(eventDate, 'eventDate', Date),
    validate.string(petId, 'petId'),
    validate.string(userId, 'userId')

    
    const pet = await Pet.findById(petId)
        if(!pet) {
            throw new NotAllowedError (`pet with id ${petId} does not exist`)
        }
    
    const user = await User.findById(userId)
        if(!user) {
            throw new NotAllowedError (`user with id ${userId} does not exist`)
        }

    const alert = new Alert ({subject, description, telephone, creation, eventDate})

        alert.pets = petId

        await User.update({ _id: userId}, {$push:{alerts: alert}})
        

}
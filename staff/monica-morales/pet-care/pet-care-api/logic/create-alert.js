const { validate } = require('pet-care-utils')
const { models: { Alert, Pet, User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

// /*@params {idUSer, idPet, subject, description, telephone,creation, EventDate}*/
// /*buscar bd si el usuario existe*/
// /*si no existe lanzamos un error*/
// /*si existe: 
//     crear alerta con un create con los campos que necesito
//     devolver alerta?*/


module.exports = (subject, description, telephone, creation, eventDate, petId, userId) => {

    validate.string(subject, 'subject')
    validate.string(description, 'description')
    validate.string(telephone, 'telephone')
    validate.type(eventDate, 'eventDate', Date)
    validate.string(petId, 'petId')
    validate.string(userId, 'userId')

    return (async () => {


        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const pet = await Pet.findById(petId)
        if (!pet) {
            throw new NotFoundError(`pet with id ${petId} does not exist`)
        }

       
        const alert = new Alert({ subject, description, telephone, creation, eventDate })

        alert.pets = petId

        await User.update({ _id: userId }, { $push: { alerts: alert } })
    })()
}
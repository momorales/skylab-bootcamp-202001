
const { models: { Alert, Pet, User} } = require('pet-care-data')


/*@params {idUSer, idPet, subject, description, telephone,creation, EventDate}*/
/*buscar bd si el usuario existe*/
/*buscar bd si la alerta existe*/
/*si el usuario o la alerta no existe lanzamos un error*/
/*si existen: 
    devolver alerta?*/

module.exports = async (id) => {

    const user = await User.findById(id).populated('alerts').lean()

    return user.alerts
}
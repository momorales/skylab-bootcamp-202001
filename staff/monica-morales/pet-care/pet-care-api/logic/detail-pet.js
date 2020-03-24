const { validate } = require('pet-care-utils')
const { models: { Pet, User } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = (id, idPet) => {

    return User.findById(id)
        .then(user=>{
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
        })
        .then(()=>{
            return Pet.findById(idPet)
            .then(pet=>{
                if(pet) 
                    return pet    
                else{
                    throw new NotFoundError (`pet with id ${idPet} does not exist`)
                }
            })
        })

}

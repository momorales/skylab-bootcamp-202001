const { validate } = require('pet-care-utils')
const { models: { Pet, User,Diagnostic } } = require('pet-care-data')
const { NotAllowedError, NotFoundError } = require('pet-care-errors')

module.exports = (numberChip, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic) =>{
   
    validate.string(numberChip, 'numberChip')
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.type(birthDate, 'birthDate', Date)
    validate.string(specie, 'specie')
    validate.string(sex, 'sex')
    validate.string(race, 'race')
    validate.string(typeRace, 'typeRace')
    validate.string(fur, 'fur')
    validate.type(sterilized, 'sterilized', Boolean)
    validate.type(weight, 'weight', Number)
    validate.type(created, 'created', Date)

    return User.findById(id)
        .then(user => {
            if(!user) {
                throw new NotFoundError (`user with id ${id} does not exist`)
            }
        })
        .then(()=>{
            return Pet.findOne({numberChip})
                .then(pet=>{
                    if(pet){
                        throw new NotAllowedError(`pet with numberChip ${numberChip} already exists`)
                    } 
                })
                .then(()=>{
                    const newPet = new Pet({owner: id, numberChip, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic})
                    return newPet.save()
                    .then(result =>{
                        return User.updateOne({ _id: id}, {$push:{pets: result.id}})
                        .then(()=>{})

                     })
                })
        })
}

         
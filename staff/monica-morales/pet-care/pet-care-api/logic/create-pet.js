const { validate } = require('pet-care-utils')
const { models: { Pet, User,Diagnostic } } = require('pet-care-data')
const { NotAllowedError, NotFoundError } = require('pet-care-errors')

/**
 * Creates a new pet
 * 
 * @param {string} numberChip pet's identifier
 * @param {string} id owner pet unique id user's number (owner)
 * @param {string} name pet's name
 * @param {Date} birthDate pet's birthDate
 * @param {string} specie pet's specie
 * @param {string} sex pet's sex 
 * @param {string} race pet's race
 * @param {string} typeRace pet's type of race(small, medium, big)
 * @param {string} fur pet's type of fur
 * @param {string} sterilized if pet is sterilized or not
 * @param {number} weight pet's weight (kg)
 * @param {Date} created date of created pet in app
 * 
 * 
 * @returns {Promise<string>} returns an empty Promise on a successful pet creation
 * 
 * @throws {NotFoundError} if the user does not exist
 * @throws {NotAllowedError} if pet already exists
 */


module.exports = (numberChip, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created) =>{
   
    validate.string(numberChip, 'numberChip')
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.type(birthDate, 'birthDate', Date)
    validate.string(specie, 'specie')
    validate.string(sex, 'sex')
    validate.string(race, 'race')
    validate.string(typeRace, 'typeRace')
    validate.string(fur, 'fur')
    validate.string(sterilized, 'sterilized')
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
                    const newPet = new Pet({owner: id, numberChip, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
                    return newPet.save()
                    .then(result =>{
                        return User.updateOne({ _id: id}, {$push:{pets: result.id}})
                        .then(()=>{})

                     })
                })
        })
}

         
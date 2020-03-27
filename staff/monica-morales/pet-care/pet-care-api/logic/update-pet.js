const { validate } = require('pet-care-utils')
const { models: { Pet, User,Diagnostic } } = require('pet-care-data')
const { NotAllowedError, NotFoundError } = require('pet-care-errors')

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
                    return Pet.findOneAndUpdate({_id: id, userId: owner}, {$set: owner, numberChip, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created })
                })
                .then(()=>{})
        })
}



// const { validate } = require('share-my-spot-utils')
// const { models: { Spot } } = require('share-my-spot-data')

// module.exports = (userId, body, spotId) => {
//     validate.string(userId, 'userId')
//     validate.string(spotId, 'spotId')

//     return Spot.findOneAndUpdate({ _id: spotId, publisherId: userId }, { $set: body })
//         .then(() => { })
// }
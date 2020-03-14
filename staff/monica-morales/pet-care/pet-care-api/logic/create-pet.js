const { validate } = require('pet-care-utils')
const { models: { Pet, User,Diagnostic } } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')

module.exports = async (numberChip, owner, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic, userId) =>{
   
    validate.string(numberChip, 'owner')
    validate.string(owner, 'numberChip')
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

    
    const user =  await User.findById(owner)
        if(!user) {
            throw new NotAllowedError (`user with id ${owner} does not exist`)
        }

    const pet = await Pet.findOne({numberChip})

    if(pet){

        throw new NotAllowedError(`pet with numberChip ${numberChip} already exists`)
    } 
  
    const newPet = new Pet({owner, numberChip, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic})
   
    await newPet.save()    

    user.pets = newPet.id

    await User.update({ _id: owner}, {$push:{pets: newPet.id}})
    
    return

}

         
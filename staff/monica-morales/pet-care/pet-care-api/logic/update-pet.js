const { validate } = require('pet-care-utils')
const { models: { Pet, User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')


/**
 * Updates the pet's info
 * 
 * @param {string} idPet pet's unique id
 * @param {string} id user's unique id
 * @param {string} name pet's name
 * @param {date} birthDate pet's birthdate
 * @param {string} specie pet's specie
 * @param {string} sex pet's sex
 * @param {string} race pet's race
 * @param {string} typeRace pet's type of race
 * @param {string} fur pet's type of fur
 * @param {string} sterilized if pet is sterilized or not
 * @param {number} weight pet's weight(kg)
 * @param {date} created date created pet in app
 * 
 * @returns {Promise<string>} an empty Promise on a successful update
 * 
 * @throws {NotAllowedError} if a user or pet is not exists
 */

module.exports = (idPet, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created) =>{
   
    validate.string(idPet, 'idPet')
    validate.string(id, 'id')

    name && (validate.string(name, 'name'))
    birthDate && (validate.type(birthDate, 'birthDate', Date))
    specie && (validate.string(specie, 'specie'))
    sex && (validate.string(sex, 'sex'))
    race && (validate.string(race, 'race'))
    typeRace && (validate.string(typeRace, 'typeRace'))
    fur && (validate.string(fur, 'fur'))
    sterilized && (validate.string(sterilized, 'sterilized'))
    weight && (validate.type(weight, 'weight', Number))
    created && (validate.type(created, 'created', Date))

    return (async ()=> {

        const user = await User.findById(id)

        if(!user) throw new NotFoundError (`user with id: ${id} does not exist`)

        const pet = await Pet.findById(idPet)

        if(!pet) throw new NotFoundError (`pet with id: ${idPet} does not exist`)


        name && (pet.name = name)
        birthDate && (pet.birthDate = birthDate)
        specie && (pet.specie = specie)
        sex && (pet.sex = sex)
        race && (pet.race = race)
        typeRace && (pet.typeRace = typeRace)
        fur && (pet.fur = fur)
        sterilized && (pet.sterilized = sterilized)
        weight && (pet.weight = weight)
        created && (pet.created = created)

        await pet.save()

        return 

    })()

}



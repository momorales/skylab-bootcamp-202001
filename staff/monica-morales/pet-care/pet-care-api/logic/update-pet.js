const { validate } = require('pet-care-utils')
const { models: { Pet, User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

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
    sterilized && (validate.type(sterilized, 'sterilized', Boolean))
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




const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idPet, id) => {

    validate.string(idPet, 'idPet')
    validate.string(id, 'id')

    return (async () => {


        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const pet = await Pet.findById(idPet)
        if (!pet) throw new NotFoundError(`pet with id ${idPet} does not exist`)

        result =[]

        pet.diagnostics.filter((diagnostic=>{
            const diagnos = {
                idPet: pet._id,
                namePet: pet.name,
                idDiagnostic: diagnostic._id,
                nameDiagnostic: diagnostic.name,
                test: diagnostic.test,
                description: diagnostic.description,
                lab: diagnostic.lab,
                            }
            result.push(diagnos)
        }))

        
        const diagnostics = pet.diagnostics

        return result

    })()
}

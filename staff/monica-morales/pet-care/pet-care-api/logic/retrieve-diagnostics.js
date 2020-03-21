
const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idPet, id) => {

    //TODO user
    //diagnostic es un esquema también no?

    validate.string(idPet, 'idPet')
    validate.string(id, 'id')

    return (async () => {


        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const pet = await Pet.findById(idPet)
        if (!pet) throw new NotFoundError(`pet with id ${idPet} does not exist`)

        // return Pet.find({ _id: idPet }, { diagnostics: 1 })
        //     .then(diagnostics => {
        //         if (diagnostics) return diagnostics
        //         else throw new NotFoundError(`diagnostic with id ${idDiagnostic} does not exist`)
        //     })

        const diagnostics = pet.diagnostics

        return diagnostics

    })()
}

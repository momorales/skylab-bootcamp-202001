
const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idDiagnostic, idPet, id) => {

    validate.string(idDiagnostic, 'idDiagnostic')
    validate.string(idPet, 'idPet')
    validate.string(id, 'id')

    return ( async () => {


        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
    
        const pet =  await Pet.findById(idPet)
    
        if(!pet) throw new NotFoundError (`pet with id ${idPet} does not exist`)
        
        return Pet.find({_id:idPet},{ diagnostics: { $elemMatch: { _id: idDiagnostic } }})
           .then(diagnostic =>{
               if(diagnostic) return diagnostic
               else throw new NotFoundError(`diagnostic with id ${idDiagnostic} does not exist`)
           })

    })()

}

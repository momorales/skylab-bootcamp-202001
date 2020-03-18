
const { validate } = require('pet-care-utils')
const { models: { Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idDiagnostic, idPet) => {
debugger
    validate.string(idDiagnostic, 'idDiagnostic')
    validate.string(idPet, 'idPet')
    
    
    return Pet.find({_id:idPet},{ diagnostics: { $elemMatch: { _id: idDiagnostic } }})
       .then(diagnostic =>{
           if(diagnostic) return diagnostic
           else throw new NotFoundError(`diagnostic with id ${idDiagnostic} does not exist`)
       })
}

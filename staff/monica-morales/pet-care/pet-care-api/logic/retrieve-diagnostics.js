
const { validate } = require('pet-care-utils')
const { models: { Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idPet) => {

    //TODO user
    //diagnostic es un esquema también no?

    validate.string(idPet, 'idPet')   
    
    return Pet.find({_id:idPet},{ diagnostics: 1})
       .then(diagnostic =>{
           if(diagnostic) return diagnostic
           else throw new NotFoundError(`diagnostic with id ${idDiagnostic} does not exist`)
       })
}

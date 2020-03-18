const { validate } = require('pet-care-utils')
const { models: { Pet, Diagnostic } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (name, test, description, lab, dateCreate, petId) => {
debugger
    validate.string(name, 'name')
    validate.string(test, 'test')
    validate.string(description, 'description')
    validate.string(lab, 'lab')
    validate.string(petId, 'petId')
        
    return (async()=>{

        const pet = await Pet.findById(petId)

        if(!pet) throw new NotFoundError (`pet with id ${petId} does not exist`)
        
        const diagnostic = new Diagnostic ({name, test, description, lab, dateCreate})

        pet.diagnostics.push(diagnostic)

        await pet.save()

        return 
  })()
}
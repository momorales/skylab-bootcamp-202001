const { validate } = require('pet-care-utils')
const { models: { User, Pet, Diagnostic } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (name, test, description, lab, dateCreate, petId, id) => {


  validate.string(name, 'name')
  validate.string(test, 'test')
  validate.string(description, 'description')
  validate.string(lab, 'lab')
  validate.string(petId, 'petId')
  validate.string(id, 'id')

  return (async () => {

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    const pet = await Pet.findById(petId)

    if (!pet) throw new NotFoundError(`pet with id ${petId} does not exist`)

    const diagnostic = new Diagnostic({ name, test, description, lab, dateCreate })

    pet.diagnostics.push(diagnostic)

    await pet.save()
    debugger

    return diagnostic.id
  })()
}
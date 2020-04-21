const { validate } = require('pet-care-utils')
const { models: { User, Pet, Diagnostic } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

/**
 * Creates a new diagnostic
 * 
 * @param {string} name diagnostic's title 
 * @param {string} test diagnostic's type of prove
 * @param {string} description diagnostic's description information
 * @param {string} lab laboratory where the test was done
 * @param {Date} dateCreate day the test was done
 * * @param {string} petId pet unique id pet's number (pet)
 * @param {string} id owner pet unique id user's number (owner)
 * 
 * @returns {Promise<string>} returns id of new diagnostic
 * 
 * @throws {NotFoundError} if the user or pet does not exist
 */

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

    return diagnostic.id
  })()
}
require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const updatePet= require('./update-pet')
const { mongoose, models: { User, Alert, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')
const bcrypt = require('bcryptjs')

describe('update pet', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, petId
    let newPetName, newBirthDate, newSpecie, newSex, newRace, newTypeRace, newFur, newSterilized, newWeight, newCreated
   

    beforeEach ( async ()=>{

        //data to create user
        name = `name-${random()}`
        username = `username-${random()}`
        email = `username-${random()}@gmail.com`
        password = `password-${random()}`

        //data to create pet
        numberChip = `numberChip-${random()}`
        petName = `name-${random()}@gmail.com`
        birthDate = new Date()
        specie = `specie-${random()}`
        sex = `sex-${random()}`
        race = `race-${random()}`
        typeRace = `typeRace-${random()}`
        fur = `fur-${random()}`
        sterilized = 'false'
        weight = 30
        created = new Date()

      
        newPetName = `newName-${random()}@gmail.com`
        newBirthDate = 'Sun, 29 Mar 2020 17:26:13 GMT'
        newSpecie = `newSpecie-${random()}`
        newSex = `newSex-${random()}`
        newRace = `newRace-${random()}`
        newTypeRace = `newTypeRace-${random()}`
        newFur = `newFur-${random()}`
        newSterilized = 'true'
        newWeight = 40
        newCreated = 'Sun, 29 Mar 2021 17:26:13 GMT'
        
        //create user and extract id

        const user = await User.create({name, username, email, password, created: new Date })
        id = user.id

        //create pet

        const pet = await Pet.create({owner: id, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        petId = pet.id

    })   

    it('should succeed on correct user and pet id', async () => {
         
        const response = await updatePet(petId, id, newPetName, newBirthDate, newSpecie, newSex, newRace, newTypeRace, newFur, newSterilized, newWeight, newCreated)

        expect(response).to.not.exist
        
        const updatedPet = await Pet.findById(petId)
        expect(updatedPet.name).to.equal(newPetName)
        expect(updatedPet.specie).to.equal(newSpecie)
        expect(updatedPet.sex).to.equal(newSex)
        expect(updatedPet.race).to.equal(newRace)
        expect(updatedPet.typeRace).to.equal(newTypeRace)
        expect(updatedPet.fur).to.equal(newFur)
        expect(updatedPet.sterilized).to.equal(newSterilized)
        expect(updatedPet.weight).to.equal(newWeight)
                
    })
    it('should fail on wrong user id', async () => {
        
        const wrongId = 'iutiy87ujy7u'

        try {
            await updatePet(petId, wrongId, newPetName, newBirthDate, newSpecie, newSex, newRace, newTypeRace, newFur, newSterilized, newWeight, newCreated)

            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id: ${wrongId} does not exist`)
        }
    })
    it('should fail on wrong pet id', async () => {
        
        const wrongPetId = 'iutiy87ujy7u'

        try {
            await updatePet(wrongPetId, id, newPetName, newBirthDate, newSpecie, newSex, newRace, newTypeRace, newFur, newSterilized, newWeight, newCreated)

            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id: ${wrongPetId} does not exist`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
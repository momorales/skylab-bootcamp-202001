require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')
const createDiagnostic = require('./create-diagnostic')
const {random } = Math
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('createDiagnostic', () => {

    let name, test, description, lab, dateCreate, _petId, _userId

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(()=>{
        name = `name-${random()}`
        username = `username-${random()}`
        email = `username-${random()}@gmail.com`
        password = `password-${random()}`

        return bcrypt.hash(password, 10)
        .then((password) => User.create({name, username, email, password, created: new Date }))
        .then((user) => _userId = user.id)
    }) 

    beforeEach(()=>{
        numberChip = `numberChip-${random()}`
        petName = `name-${random()}@gmail.com`
        birthDate = `2020/01/01`
        specie = `specie-${random()}`
        sex = `sex-${random()}`
        race = `race-${random()}`
        typeRace = `typeRace-${random()}`
        fur = `fur-${random()}`
        sterilized = true
        weight = 40
        created = `2020/01/01`
        owner = _userId


                    
        return Pet.create({owner: _userId, numberChip, name:petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
        .then((pet) => _petId = pet.id)
        
        }) 


    beforeEach(() => {
        name = `name-${random()}`
        test = `test-${random()}`
        description = `description-${random()}`
        lab = `lab-${random()}`
        dateCreate = new Date
        

    })

    it('should succeed on correct diagnostic in pet', async () => {
        debugger
        const newDiagnostic = await createDiagnostic(name, test, description, lab, dateCreate, _petId, _userId)

        expect(newDiagnostic).to.exist
        expect(newDiagnostic).to.be.a('string')

        const pet = await Pet.findById(_petId)

        expect(pet.diagnostics).to.exist
        expect(pet.diagnostics.length).to.be.greaterThan(0)
        expect(pet.diagnostics[pet.diagnostics.length-1].name).to.equal(name)
        expect(pet.diagnostics[pet.diagnostics.length-1].description).to.equal(description)
        expect(pet.diagnostics[pet.diagnostics.length-1].test).to.equal(test)
        expect(pet.diagnostics[pet.diagnostics.length-1].lab).to.equal(lab)
    })

    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await createDiagnostic(name, test, description, lab, dateCreate, _petId, wrongId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} not found`)
        }
    })

    it('should fail on wrong pet id', async () => {
        let wrongPetId = '293898iujuyh'
    
        try {
            await createDiagnostic(name, test, description, lab, dateCreate, wrongPetId, _userId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id ${wrongPetId} does not exist`)
        }
    })

    after(()  => mongoose.disconnect())
})


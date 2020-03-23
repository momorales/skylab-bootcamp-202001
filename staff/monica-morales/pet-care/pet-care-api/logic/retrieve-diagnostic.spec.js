require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet, Diagnostic } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')
const retrieveDiagnostic = require('./retrieve-diagnostic')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('retrieve diagnostic', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, _petId
    let test, description, lab, dateCreate, idDiagnostic
    

    beforeEach ( async ()=>{

        //data to create user
        name = `name-${random()}`
        username = `username-${random()}`
        email = `username-${random()}@gmail.com`
        password = `password-${random()}`

        //data to create pet

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
        created = new Date

        //data to create diagnostics

        
        test: `test-${random()}`
        description: `description-${random()}`
        lab: `lab-${random()}`
        dateCreate: new Date()

        //create user and extract id

        const user = await User.create({name, username, email, password, created })
        id = user.id

        //create pet

        let pet = await Pet.create({owner:id, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        _petId = pet.id


        //create diagnostics
        debugger
       
        const diagnostic = await new Diagnostic({petName, test, description, lab, dateCreate})
        user.diagnostics = []

        idDiagnostic = diagnostic.id
        pet.diagnostics.push(idDiagnostic)

        await pet.save()

       
    })   
 
    
    it('should succeed retrieving all diagnostics of a single pet', async ()=> {
        const diagnostic = await retrieveDiagnostic(idDiagnostic,_petId, id)
            expect(diagnostic).to.exist
           
                
    
    })

    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await retrieveDiagnostic(idDiagnostic,_petId, wrongId)
    
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
            await retrieveDiagnostic(idDiagnostic, wrongPetId, id)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id ${wrongPetId} does not exist`)
        }
    })

    // it('should fail on wrong diagnostic id', async () => {
    //     let wrongDiagnostic = '293898iujuyh'
    
    //     try {
    //         await retrieveDiagnostic(wrongDiagnostic, _petId, id)
    
    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`diagnostic with id ${wrongDiagnostic} does not exist`)
    //     }
    // })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
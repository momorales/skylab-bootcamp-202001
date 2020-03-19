require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet, Diagnostic } } = require('pet-care-data')
const retrieveDiagnostics = require('./retrieve-diagnostics')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('retrieve pets', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, _petId
    let test, description, lab, dateCreate
    



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
        created = `2020/01/01`

        //data to create diagnostics

        
        test: `test-${random()}`
        description: `description-${random()}`
        lab: `lab-${random()}`
        dateCreate: new Date()

        //create user and extract id

        const user = await User.create({name, username, email, password, created: new Date })
        id = user.id

        //create pet

        let pet = await Pet.create({owner, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        _petId = pet.id


        //create diagnostics
        const diagnosticsToCreate = 3
        const diagnosticsContainer= []

        for(let i = 0; i <= diagnosticsToCreate; i++) {

            let diagnostic = await Diagnostic.create({petName, test, description, lab, dateCreate})
            diagnosticsContainer.push(diagnostic)

        }
       
    })   
 
    
    it('should succeed retrieving all diagnostics of a single pet', async ()=> {
        const diagnostics = await retrieveDiagnostics(_petId)
            expect(diagnostics).to.exist
            expect(diagnostics).to.have.lengthOf(diagnosticsContainer)
                
        diagnostics.forEach(diagnostic => {
            expect(diagnostic.id).to.be.a('string')
            expect(diagnostic.owner).to.be.a('string')
            expect(diagnostic.owner).to.equal(owner)
        })  
    
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
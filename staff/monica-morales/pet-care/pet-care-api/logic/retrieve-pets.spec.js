require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')
const retrievePets = require('./retrieve-pets')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('retrieve pets', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, idAdmin
    let petsContainer
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

        //create user and extract id

        const user = await User.create({name, username, email, password, created: new Date })
        id = user.id

        //create admin user (veterinarian)

        const admin = await User.create({name, username, email, password, created: new Date })
        idAdmin = admin.id

        //create pets 
        const petsToCreate = 4
        petsContainer = []

        for(let i = 0; i <= petsToCreate; i++) {

            let pet = await Pet.create({owner: id, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})
            petsContainer.push(pet)

        }
       
    })   
 
    
    it('should succeed retrieving all pets', async ()=> {
        const pets = await retrievePets(idAdmin)
            expect(pets).to.exist
            expect(pets).to.have.lengthOf(petsContainer.length)
                
    
    })

    it('should fail on wrong admin id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await retrievePets(wrongId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} not found`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

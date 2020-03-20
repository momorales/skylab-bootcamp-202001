require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const retrievePetsOwned = require('./retrieve-pets-owned')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('retrieve pets owned', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, _petId
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

        //create pets 
        const petsToCreate = 4
        petsContainer = []

        for(let i = 0; i <= petsToCreate; i++) {

            let pet = await Pet.create({owner, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})


            petsContainer.push(pet)
            user.pets.push(pet)
            await user.save()

        }
       
    })   
 
    
    it('should succeed retrieving all pets', async ()=> {
        const pets = await retrievePetsOwned(id)
            expect(pets).to.exist
            expect(pets).to.have.lengthOf(petsContainer.length)

        const user = await User.findById(id)
                
        pets.forEach(pet => {debugger
            _petId = pet._id
            expect (user.pets).includes(_petId)
            expect(_petId.toString()).to.be.a('string')
            expect(pet.owner.toString()).to.be.a('string')
            expect(pet.owner.toString()).to.equal(owner)
        })         
    
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

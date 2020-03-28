require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { NotFoundError, ContentError } = require('pet-care-errors')
const deletePet = require('./delete-pet')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('delete pet', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, petId
    
   

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

        //create pet

        const pet = await Pet.create({owner: id, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        petId = pet.id

        user.pets.push(petId)

        await user.save()
    })   
 
    
    it('should succeed deleting pet', async ()=> {

        const response = await deletePet(id, petId)
        
        expect(response).to.not.exist
               
        const _pet = await Pet.findById(petId)
        
        expect(_pet).to.not.exist
        
        
    })

    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await deletePet(wrongId, petId)
    
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
            await deletePet(id, wrongPetId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id ${wrongPetId} not found`)
        }
    })


    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')
const createVisit = require('./create.visit')
const {random } = Math
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('createVisit', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        // .then(() => User.deleteMany())
        // .then(() => Pet.deleteMany())
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, userId, petId

    beforeEach(()=>{
        name = `name-${random()}`
        username = `username-${random()}`
        email = `username-${random()}@gmail.com`
        password = `password-${random()}`

        return bcrypt.hash(password, 10)
        .then((password) => User.create({name, username, email, password, created: new Date }))
        .then((user) => userId = user.id)
    })   

    beforeEach( async ()=>{
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
        owner = userId

        description = `description-${random()}`
        dateAppointment = new Date
        hour = `hour-${random()}`
        

        const pet = await Pet.create({owner, numberChip, name:petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
        
        petId = pet.id
        
    }) 
    
    it('should succeed on correct new appointment', async ()=> {

        //TODO insert userID

        const newAppointmentId = await createVisit( description, dateAppointment, hour, petId, userId)
        
        expect(newAppointmentId).to.exist

        const pet = await Pet.findById(petId) 
        
        expect(pet.appointments).to.be.an('array')
        expect((pet.appointments[0]._id).toString()).to.equal(newAppointmentId)       
        
    })

    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await createVisit(description, dateAppointment, hour, petId, wrongId)
    
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
            await createVisit(description, dateAppointment, hour, wrongPetId, userId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id ${wrongPetId} does not exist`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

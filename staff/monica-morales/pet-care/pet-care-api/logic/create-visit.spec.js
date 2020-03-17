require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const createVisit = require('./create.visit')
const {random } = Math
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('createVisit', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => User.deleteMany())
        .then(() => Pet.deleteMany())
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, _userId, _petId

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

        description = `description-${random()}`
        dateAppointment = new Date
        hour = `hour-${random()}`
        

        return Pet.create({owner, numberChip, name:petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
            .then((pet) => _petId = pet.id)
    }) 
    
    it('should succeed on correct new appointment', async ()=> {
        const newAppointment = await createVisit( description, dateAppointment, hour, _petId)
        
        expect(newAppointment).to.be.exist
              
        
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const createAlert = require('./create-alert')
const {random } = Math
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('createAlert', () => {
    
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

        subject = `subject-${random()}`
        description = `description-${random()}`
        telephone = `telephone-${random()}`
        creation = new Date
        eventDate = new Date
        owner = _userId

        return Pet.create({owner, numberChip, name:petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
            .then((pet) => _petId = pet.id)
    }) 
    
    it('should succeed on correct new alert', async ()=> {
        const newAlert = await createAlert( subject, description, telephone, creation, eventDate,_petId,_userId)
            expect(newAlert).to.be.exist
                
        return User.find({_id:_userId},{ alerts: { $elemMatch: { _id: _petId } }})
            .then(alert => {
                expect(alert).to.exist
                expect(alert).to.be.an.instanceof(Object)
            })       
    
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveAlerts= require('./retrieve-alerts')
const { mongoose, models: { User,Alert, Pet } } = require('pet-care-data')
const bcrypt = require('bcryptjs')

describe('retrieveAlerts', () => {
    
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => User.deleteMany())
    )
    
    let name, username, email, password, subject, description, telephone, eventDate, _petId, _userId, _alertId
    
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
        
        return Pet.create({owner, numberChip, name:petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
            .then((pet) => _petId = pet.id)
    }) 
debugger
    beforeEach(()=>{
        subject = 'deworming'
        description = `description-${random()}`
        telephone = `telephone-${random()}`
        creation = new Date
        eventDate = new Date
                  
        return Alert.create({subject, description, telephone, creation, eventDate, _petId, _userId})
        .then((alert) => _alertId = alert.id)
        
    })

    it('should succeed on correct and valid and right data', () =>{
    
        retrieveAlerts(_alertId)
            .then(alerts => {
                expect(alerts).to.exist
                expect(alerts.subject).to.equal(subject)
                expect(alerts.description).to.equal(description)
                expect(alerts.telephone).to.equal(telephone)
                expect(alerts.creation).to.equal(creation)
                expect(alerts.eventDate).to.equal(eventDate)
                expect(alerts).to.be.an.instanceOf(Object)
                expect(alerts.creation).to.be.an.instanceOf(Date)
                expect(alerts.eventDate).to.be.an.instanceOf(Date)
            })
        })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany(), Alert.deleteMany()]).then(() => mongoose.disconnect()))
})

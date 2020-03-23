require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveAlerts = require('./retrieve-alerts')
const { mongoose, models: { User, Alert, Pet } } = require('pet-care-data')
const bcrypt = require('bcryptjs')

describe('retrieveAlerts', () => {

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, username, email, password, subject, description, telephone, eventDate, _petId, _userId, _alertId

    beforeEach( async () => {
        name = `name-${random()}`
        username = `username-${random()}`
        email = `username-${random()}@gmail.com`
        password = `password-${random()}`

        //create user and extract id

        // return bcrypt.hash(password, 10)
        //     .then((password) => User.create({ name, username, email, password, created: new Date }))
        //     .then((user) => _userId = user.id)
        
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
        
        subject = 'deworming'
        description = `description`
        telephone = `telephone-${random()}`
        creation = new Date
        eventDate = new Date
        
        const user = await User.create({name, username, email, password, created })
        _userId = user.id

        const pet = await Pet.create({ owner: _userId, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created })

        _petId = pet.id

        
        const alert = await new Alert({subject, description, telephone, creation, eventDate})
    
        idAlert = alert.id
        

        alert.pets.push(_petId)
        await alert.save()

        user.alerts.push(_alertId)

        await user.save()


    })

    it('should succeed on correct and valid and right data', async () => {

        const alerts = await retrieveAlerts(_userId)
        debugger
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


after(() => Promise.all([User.deleteMany(), Pet.deleteMany(), Alert.deleteMany()]).then(() => mongoose.disconnect()))
})

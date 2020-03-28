require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveAlerts = require('./retrieve-alerts')
const { mongoose, models: { User, Alert, Pet } } = require('pet-care-data')
const bcrypt = require('bcryptjs')

describe.only('retrieveAlerts', () => {

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany(), Pet.deleteMany(), Alert.deleteMany)
    )

    let name, username, email, password, subject, description, telephone, eventDate, _petId, numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, owner,_userId, _alertId, alertId2, creation, creation2, description2, telephone2, eventDate2, subject2

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
        
        subject = 'vaccines'
        description = 'description'
        telephone = `telephone-${random()}`
        creation = new Date
        eventDate = new Date

        subject2 = 'deworming'
        description2 = 'description2'
        telephone2 = `telephone2-${random()}`
        creation2 = new Date
        eventDate2 = new Date
        
        const user = await User.create({name, username, email, password, created })
        _userId = user.id

        const pet = await Pet.create({ owner: _userId, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created })

        _petId = pet.id

        
        const alert = await Alert.create({subject, description, telephone, creation, eventDate})
    
        _alertId = alert.id

        const alert2 = await Alert.create({subject: subject2, description: 'description2', telephone: telephone2, creation: creation2, eventDate: eventDate2})
    
        alertId2 = alert2.id
        
        debugger
        alert.pets.push(_petId)
        await alert.save()
        await alert2.pets.push(_petId)

        user.alerts.push(alert)
        user.alerts.push(alert2)

        await user.save()


    })

    it('should succeed on correct and valid and right data', async () => {debugger

        const alerts = await retrieveAlerts(_userId)
        
        

            expect(alerts[0]).to.exist
            expect(alerts[0].subject).to.equal(subject)
            expect(alerts[0].description).to.equal(description)
            expect(alerts[0].telephone).to.equal(telephone)
            expect(alerts[0].creation).to.equal(creation)
            expect(alerts[0].eventDate).to.equal(eventDate)
            expect(alerts[0]).to.be.an.instanceOf(Object)
            expect(alerts[0].creation).to.be.an.instanceOf(Date)
            expect(alerts[0].eventDate).to.be.an.instanceOf(Date)

    })


after(() => Promise.all([User.deleteMany(), Pet.deleteMany(), Alert.deleteMany()]).then(() => mongoose.disconnect()))
})

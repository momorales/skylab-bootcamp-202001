require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const {NotFoundError} = require('pet-care-errors')
const createAlert = require('./create-alert')
const {random } = Math
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe.only('createAlert', () => {
    
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
        
        const response = await createAlert( subject, description, telephone, creation, eventDate,_petId,_userId)
        
        expect(response).to.not.exist
                
        return User.find({_id:_userId},{ alerts: { $elemMatch: { _id: _petId } }})
            .then(alert => {debugger
                expect(alert).to.exist
                expect(alert).to.be.an.instanceof(Object)
            })       
    
    })


    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await createAlert( subject, description, telephone, creation, eventDate,_petId, wrongId)
    
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
            await createAlert( subject, description, telephone, creation, eventDate, wrongPetId, _userId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`pet with id ${wrongPetId} does not exist`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

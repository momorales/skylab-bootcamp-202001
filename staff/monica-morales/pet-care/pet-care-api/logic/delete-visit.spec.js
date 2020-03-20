require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet, Appointment } } = require('pet-care-data')
const { NotFoundError, ContentError } = require('pet-care-errors')
const deleteVisit = require('./delete-visit')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('delete visit', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany(), Appointment.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, petId
    let appointmentId, description, dateAppointment, hour
   

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

        //data to create appointment

        description = `description-${random()}`
        dateAppointment = new Date
        hour = `hour-${random()}`

        
        //create user and extract id

        const user = await User.create({name, username, email, password, created: new Date })
        id = user.id

        //create pet

        const pet = await Pet.create({owner: id, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        petId = pet.id




        //create appointment and push to pet
        
        const newAppointment = await new Appointment({description,dateAppointment, hour, petId})
        appointmentId = newAppointment.id
       
        pet.appointments.push(newAppointment)

        await pet.save()
    })   
 
    
    it('should succeed deleting appointment pet', async ()=> {

        const response = await deleteVisit(appointmentId, petId, id)
        
        expect(response).to.not.exist
               
        const _pet = await Pet.findById(petId)
        const appointment = _pet.appointments.find(app => app.id === appointmentId)

        expect((_pet.appointments).length).to.equal(0)
        expect(appointment).to.not.exist
        
    })

    it('should fail on wrong user id', async () => {
        let wrongId = '293898iujuyh'
    
        try {
            await deleteVisit(appointmentId, petId, wrongId)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} not found`)
        }
    })


    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
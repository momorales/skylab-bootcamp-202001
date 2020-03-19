require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet, Appointment } } = require('pet-care-data')
const deleteVisit = require('./delete-visit')
const {random } = Math


const { env: { TEST_MONGODB_URL } } = process

describe('retrieve pets', () => {
    
    before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => Promise.all([User.deleteMany(), Pet.deleteMany(), Appointment.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, id, _petId
    let _idAppointment, description, dateAppointment, hour
    



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

        const pet = await Pet.create({owner, numberChip, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created: new Date()})

        _petId = pet.id


        //create appointment
        
        const newAppointment = await new Appointment({petChip,dateAppointment, hour})

        _idAppointment = newAppointment.id

       
    })   
 
    
    it('should succeed deleting appointment pet', async ()=> {

        //delete no tiene sentido que devuelva el appointment

        const appointmentDeleted = await deleteVisit(_idAppointment, _petId)
            expect(appointmentDeleted).to.not.exist            
      
    
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
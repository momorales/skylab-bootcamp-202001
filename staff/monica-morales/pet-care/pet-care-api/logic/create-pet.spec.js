require('dotenv').config()

const { expect } = require('chai')
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const createPet = require('./create-pet')
const {random } = Math
const bcrypt = require('bcryptjs')



describe('petDelete', () => {

    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )
    let name, username, email, password,numberChip, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, _userId, owner

    
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
        sterilized = "true"
        weight = 40
        created = `2020/01/01`
        owner = _userId
        
        }) 
    
    it('should succeed on correct new pet', async ()=> {
        await createPet( numberChip, owner, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created)


            const newPet = await Pet.findOne({numberChip})       
            expect(newPet).to.exist
            expect(newPet._id).to.exist
            expect(newPet).to.be.an.instanceof(Object)
            expect(newPet.numberChip).to.be.a('String')
            expect(newPet.name).to.be.a('String')
            expect(newPet.specie).to.be.a('String')
            expect(newPet.sex).to.be.a('String')
            expect(newPet.race).to.be.a('String')
            expect(newPet.fur).to.be.a('String')
            expect(newPet.sterilized).to.be.a('String')
            expect(newPet.weight).to.be.a('Number')
            expect(newPet.owner).to.be.an.instanceof(Object)
    })

    after(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

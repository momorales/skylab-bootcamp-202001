const { random } = Math
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { addSpot } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('createPet', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )

    let name, username, email, password, numberChip, owner, petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created

    beforeEach(() => {

        name = `name-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        
        numberChip = `numberChip-${random()}`
        petName = `name-${random()}`
        birthDate = `2020/01/01`
        specie = `specie-${random()}`
        sex = `sex-${random()}`
        race = `race-${random()}`
        typeRace = `typeRace-${random()}`
        fur = `fur-${random()}`
        sterilized = "true"
        weight = 40
        created = `2020/01/01`
     
        }) 
                   
    
    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, username, email, password})
                .then( user => owner = user._id)
        )

        it('should succeed on correct new pet', async ()=> {

            await Pet.create({numberChip, owner, name: petName, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created})
  
                    
            const newPet = await Pet.findOne({numberChip})    

            expect(newPet).toBeDefined()
            expect(newPet._id).toBeDefined()
            expect(newPet).toBeInstanceOf(Object)
            expect(newPet.numberChip).toEqual(numberChip)
            expect(newPet.name).toEqual(petName)
            expect(newPet.specie).toEqual(specie)
            expect(newPet.sex).toEqual(sex)
            expect(newPet.race).toEqual(race)
            expect(newPet.fur).toEqual(fur)
            expect(newPet.sterilized).toEqual(sterilized)
            expect(newPet.weight).toEqual(weight)
            expect(newPet.owner).toEqual(owner)

                
    })

    afterAll(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})

})
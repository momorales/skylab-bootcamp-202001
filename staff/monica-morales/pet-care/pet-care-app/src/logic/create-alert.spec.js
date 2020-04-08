const { random } = Math
const { mongoose, models: { User, Pet } } = require('pet-care-data')
const { addSpot } = require('.')
const jwt = require('jsonwebtoken')
import context from './context'
import createAlert from './create-alert'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('addSpot', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Pet.deleteMany()]))
    )

    let name, username, email, password, subject, description, telephone, creation, eventDate

    beforeEach(() => {
        name = `name-${random()}`
        username = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        subject = `subject-${random()}`
        description = `description-${random()}`
        telephone = `telephone-${random()}`
        creation = `2019-03-04`
        eventDate = `2029-03-05`
        
    })

    describe('when user already exists', () => {
        let id
        beforeEach(() =>
            User.create({ name, username, email, password })
                .then(({ id }) => context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET))
        )

        it('should succeed on correct data', () => {
            createAlert(id, subject, description, telephone, creation, eventDate)
                .then((alert) =>
                    Promise.all([
                        User.findOne({ id: _id, alert })
                    ])
                )
                .then((newAlert) => {
                    expect(newAlert).to.exist
                    expect(newAlert.subject).toEqual(subject)
                    expect(newAlert.description).toEqual(description)
                    expect(newAlert.telephone).toEqual(telephone)
                    expect(newAlert.creation).toEqual(creation)
                    expect(newAlert.eventDate).toEqual(eventDate)
                  
                })
        })
        
    })

    afterAll(() => Promise.all([User.deleteMany(), Pet.deleteMany()]).then(() => mongoose.disconnect()))
})
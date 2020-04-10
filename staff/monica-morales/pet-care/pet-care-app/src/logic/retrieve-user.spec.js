const { random } = Math
const { retrieveUser } = require('.')
const { mongoose, models: { User } } = require('pet-care-data')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieveUser', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, username, email, password

    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, username, email, password })
                .then(({ id }) => context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET))
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)
                    expect(user.password).toBeUndefined()
                })
        )

        it('should fail on invalid token', async () => {
            try {
                await retrieveUser(`${token}-wrong`)

                throw new Error('you should not reach this point')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`token is not defined`)
            }
        })
    })

    afterAll(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})
const { random } = Math
const { mongoose, models: { User } } = require('pet-care-data')
const { registerUser } = require('.')
const bcrypt = require('bcryptjs')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('registerUser', () => {
    let name, username, email, password

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', async () => {
        const result = await registerUser(name, username, email, password)

        expect(result).toBeUndefined()

        const user = await User.findOne({ email })

        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.username).toBe(username)
        expect(user.email).toBe(email)
        
        const validPassword = await bcrypt.compare(password, user.password)

        expect(validPassword).toBeTruthy()
    })

    it('should fail on non-string name', () => {
        name = 10
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `name ${name} is not a string`)

        name = true
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `name ${name} is not a string`)

        name = undefined
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `name ${name} is not a string`)

        name = null
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `name ${name} is not a string`)
    })

    it('should fail on non-string username', () => {
        username = 1
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = true
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = undefined
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)

        username = null
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string email', () => {
        email = 1
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = true
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = undefined
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = null
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)
    })

   
    it('should fail on non-string password', () => {
        password = 1
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = true
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = undefined
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = null
        expect(() =>
            registerUser(name, username, email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)
    })

    afterAll(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})
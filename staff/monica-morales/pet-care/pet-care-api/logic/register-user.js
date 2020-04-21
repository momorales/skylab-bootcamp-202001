const { validate } = require('pet-care-utils')
const { models: { User } } = require('pet-care-data')
const { NotAllowedError } = require('pet-care-errors')
const bcrypt = require('bcryptjs')

/**
 * Registers a new user within the database
 * 
 * @param {string} name user's unique name
 * @param {string} username user's unique username
 * @param {string} email email user's unique e-mail
 * @param {string} password password user's password
 * 
 * @returns {Promise<string>} returns an empty Promise on a successful registry
 * 
 * @throws {NotAllowedError} when the typed email has already been taken
 */

module.exports = (name, username, email, password) => {
    validate.string(name, 'name')
    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
        
    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

        return bcrypt.hash(password, 10)
    })
    .then(password => {
        user = new User({ name, username, email, password, created: new Date })

        return user.save()
    })
    .then(() => { })
}   
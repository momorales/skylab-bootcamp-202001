'use strict'

describe('authenticateUser', () => {
    let username, password

    beforeEach(function () {
        beforeEach(() => {
            username = 'username-' + Math.random()
            password = 'password-' + Math.random()
        })
    })

    describe('when user already exists', () => {
        //TODO
    })

    describe('when user does not exist', () => {
        //TODO
    })

    //Code to clean the database of random users
    afterEach(done => {
        call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }, (error, response) => {
            if (error) return done(error)

            const { error: _error, token } = JSON.parse(response.content)

            if (_error) return done(new Error(_error))

            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                done()
            })
        })
    })
})
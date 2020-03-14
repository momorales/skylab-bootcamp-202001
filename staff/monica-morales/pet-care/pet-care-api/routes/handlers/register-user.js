const { registerUser } = require('../../logic')
const { NotAllowedError, ContentError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { body: { name, username, email, password } } = req

    try {
        registerUser(name, username, email, password)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}
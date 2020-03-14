const { retrieveAlerts } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { body: {subject, description, telephone, creation, eventDate, petId, userId } } = req

    try {
        
        retrieveAlerts(subject, description, telephone, creation, eventDate, petId, userId )

            .then(()=> res.status(201).end())
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
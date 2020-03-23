const { retrieveNextAppointments } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
  
    const {payload: {sub: id}} = req
    
    try {
        
        retrieveNextAppointments()

            .then(appointments =>
                res.json(appointments)
            )
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
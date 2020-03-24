const { retrieveAlerts } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {

    // const { payload: { sub:id } } = req
    const { params: { id } } = req

    try {
        
        retrieveAlerts( id )

            .then(alerts =>
                res.json(alerts)
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
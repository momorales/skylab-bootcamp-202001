const { createAppointment } = require ('../../logic')
const { NotAllowedError, ContentError } = require('pet-care-errors')

module.exports = (req, res) => {
    
    const { params: {id, petId}, body: {description, dateAppointment, hour} } = req

    try {
        
        createAppointment(description, dateAppointment, hour, petId, id)
            .then(newVisit=> {
                res.status(201).json({newVisit})
            })
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
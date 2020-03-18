const { deleteAppointment } = require('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
   
    const { params:{id, petId} } = req

    try {
        deleteAppointment(id,petId)
            .then(appointment => 
                res.status(200).json(appointment)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 

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
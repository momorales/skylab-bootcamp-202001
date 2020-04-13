const { deleteAlert } = require('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
   
    const { params:{id, eventDate} } = req

    try {
        deleteAlert(id, eventDate)
            .then(alert => 
                res.status(200).json(alert)
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
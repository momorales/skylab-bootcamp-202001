const { retrievePetsOwned } = require('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports =(req, res) =>{

    const { params: { id } } = req

    try {
        retrievePetsOwned(id)
            .then(pets =>
                res.json(pets)
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
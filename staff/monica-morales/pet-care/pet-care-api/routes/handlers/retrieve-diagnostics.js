const { retrieveDiagnostics } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
    debugger

    const {params: {idPet}} = req
  
    try {
        
        retrieveDiagnostics(idPet)

            .then(diagnostics =>
                res.json(diagnostics)
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
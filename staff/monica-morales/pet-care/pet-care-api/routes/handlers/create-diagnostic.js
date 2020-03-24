const { createDiagnostic } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {

    const { params: {id, petId}} = req

    const {body: {name, test, description, lab, dateCreate} } = req

    try {
        
        createDiagnostic(name, test, description, lab, dateCreate, petId, id )
      
            .then( () => res.status(201).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError) status = 409 

                const { message } = error

                res.status(status).json(message)
            })
            

    } 
    catch (error) {
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
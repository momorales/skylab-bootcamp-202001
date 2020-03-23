const { createPet } = require ('../../logic')
const { NotAllowedError, ContentError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { params: {id}} = req
    const { body: {numberChip, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic } } = req

    try {
        
        createPet(numberChip, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic )
            .then(newPet => {
                res.status(201).json({ newPet })
            })
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
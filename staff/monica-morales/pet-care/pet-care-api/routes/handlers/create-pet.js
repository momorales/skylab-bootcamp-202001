const { createPet } = require ('../../logic')
const { NotAllowedError, ContentError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { body: {numberChip, owner, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic } } = req

    try {
        
        createPet(numberChip, owner, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created, diagnostic )
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
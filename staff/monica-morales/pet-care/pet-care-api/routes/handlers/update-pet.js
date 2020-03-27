const { updatePet } = require('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        updatePet(numberChip, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created)
            .then(user =>
                res.status(200).json(user)
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
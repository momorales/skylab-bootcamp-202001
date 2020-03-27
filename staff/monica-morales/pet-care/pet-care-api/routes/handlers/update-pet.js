const { updatePet } = require('../../logic')
const { NotAllowedError, ContentError } = require('pet-care-errors')

module.exports = (req, res) => {
    const { params: {idPet}, payload: { sub: id }, body: {name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created} } = req
    debugger
    try {
        updatePet(idPet, id, name, birthDate, specie, sex, race, typeRace, fur, sterilized, weight, created)
            .then( () => res.status(200).end())
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
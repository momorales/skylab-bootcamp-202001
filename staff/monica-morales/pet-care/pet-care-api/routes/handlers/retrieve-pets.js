const { retrievePets } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')


module.exports =(req, res) => {

    const { params: { id } } = req

    try {
        retrievePets(id)
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

// const { retrievePets } = require ('../../logic')
// const { NotAllowedError } = require('pet-care-errors')


// module.exports =(req, res) => {
//     const { numberChip} = req.query
//     debugger
//     // const { payload: { sub: userId } } = req

//     try {
//         retrievePets( numberChip)
//             .then(pet =>
//                 res.status(200).json(user)
//             )
//             .catch(error => {
//                 let status = 400

//                 if (error instanceof NotAllowedError)
//                     status = 401 

//                 const { message } = error

//                 res
//                     .status(status)
//                     .json({
//                         error: message
//                     })
//             })
//     } catch (error) {
//         let status = 400

//         if (error instanceof TypeError || error instanceof ContentError)
//             status = 406 

//         const { message } = error

//         res
//             .status(status)
//             .json({
//                 error: message
//             })
//     }
// }
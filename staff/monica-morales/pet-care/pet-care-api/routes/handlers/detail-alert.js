const { detailAlert } = require('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {
   
    const { params:{id, idAlert} } = req

    try {
        detailAlert(id,idAlert)
            .then(alert => {
                res.status(200).json({alert})
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
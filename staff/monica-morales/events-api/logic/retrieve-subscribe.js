const {validate} = require('../utils')
const {models: {Event}} = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')


module.exports = (idUser) =>{

    validate.string(idUser, 'idUser')
        
    return Event.find({subscribers: idUser })
        .then(result =>{
            if(result.length > 0)
                return result
            else throw new NotFoundError('this user has not this subscription')
        })
}
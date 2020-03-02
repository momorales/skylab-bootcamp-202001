const {validate} = require('../utils')
const {database, database:{ObjectId}} = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')


module.exports = (idUser, idEvent) =>{

    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')

    const _idUser = ObjectId(idUser)
    const _idEvent = ObjectId(idEvent)

    const users = database.collection('users')
    const events = database.collection('events')

    return events.find({_id: _idEvent}).toArray()
        .then(event => {

            if (!event) throw new NotFoundError('event not found')

            return users.find({_id: ObjectId(_idUser), subscribeEvent: _idEvent }).toArray()
                .then(result =>{
                    if(result.length === 0)
                        return users.updateOne({_id: ObjectId(_idUser)}, {$push: {subscribeEvent: _idEvent}})
                            .then(eventSubscribe =>{
                                return users.findOne({_id: ObjectId(_idUser)})
                            })
                    else throw new NotFoundError('you already subscribe in this event')
                })
                        
        })
    }
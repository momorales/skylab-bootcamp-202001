const { validate } = require('pet-care-utils')
const { models: { Pet,User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')


module.exports = (id) => {

    validate.string(id, 'id')
    const newDate = new Date
    return (async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)       

        return Pet.find({"appointments.dateAppointment": { "$gte" : newDate}},{appointments:1})
            .then(appointments=>{
                if (appointments) return appointments
                else throw new NotFoundError(`user with id ${id} does not exist`)
            })

    })()
}


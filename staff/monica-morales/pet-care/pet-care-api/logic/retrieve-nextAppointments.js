const { validate } = require('pet-care-utils')
const { models: { User } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')


module.exports = (id) => {

    validate.string(id, 'id')
    const newDate = new Date

    return User.findById(id)
        .then(user=>{
            if (!user) throw new NotFoundError(`user with id ${id} not found`)   
        })
        .then(user=>{
            return User.findById(id).populate('pets')
                .then(pets=>{
                    if (!pets) throw new NotFoundError(`pets not found in user ${id}`) 
                    result =[]
                    pets.pets.filter((item)=>{
                        item.appointments.filter(ap=>{
                            if (ap.dateAppointment>=newDate)result.push(ap)
                        })
                    })
                    return result
                })               
        })

    // return (async () => {

    //     const user = await User.findById(id)
    //     if (!user) throw new NotFoundError(`user with id ${id} not found`)       

    //     return Pet.find({"appointment.dateAppointment": { "$gte" : newDate}},{appointment:1})
    //         .then(appointments=>{
    //             if (appointments) return appointments
    //             else throw new NotFoundError(`user with id ${id} does not exist`)
    //         })

    // })()
}


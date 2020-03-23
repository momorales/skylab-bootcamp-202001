const { validate } = require('pet-care-utils')
const { models: { User, Pet } } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (id) => {

    validate.string(id, 'id')

    //id es del veterinario
    
    //TODO: this action is made by someone logged in??
    //Then put userId as parameter too

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const pets = await Pet.find().lean()
        
        return pets

    })()
}



// const { validate } = require('pet-care-utils')
// const { models: { Pet,User } } = require('pet-care-data')
// const { NotFoundError} = require('pet-care-errors')

// module.exports = (numberChip, userId )=> {
//     validate.string(numberChip, 'numberChip')
//     validate.string(userId, 'userId')
// 
//     return Pet.findOne(numberChip)
//         .then(pet => {
//             if(!pet) throw new NotFoundError(`pet with Number Chip ${numberChip} does not exist`)

//             if(pet) return pet
//         })      
// }
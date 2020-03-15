const { validate } = require('pet-care-utils')
const { models: { Pet } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = ()=> {
    
    return (async ()=> {
        const pets = await Pet.find()
        return pets
    })()
}



// const { validate } = require('pet-care-utils')
// const { models: { Pet,User } } = require('pet-care-data')
// const { NotFoundError} = require('pet-care-errors')

// module.exports = (numberChip, userId )=> {
//     validate.string(numberChip, 'numberChip')
//     validate.string(userId, 'userId')
// debugger
//     return Pet.findOne(numberChip)
//         .then(pet => {
//             if(!pet) throw new NotFoundError(`pet with Number Chip ${numberChip} does not exist`)

//             if(pet) return pet
//         })      
// }
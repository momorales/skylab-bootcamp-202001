const { validate } = require('pet-care-utils')
const { models: { Pet } } = require('pet-care-data')
const { NotFoundError} = require('pet-care-errors')

module.exports = id => {

    return (async()=>{

    const pet = await Pet.findById(id)

    if(pet) return pet
    
    else{
        throw new NotFoundError (`pet with id ${id} does not exist`)
    }
    })()
}


// module.exports = (numberChip, id) =>{

//     return Pet.findOne({ $or: [ { numberChip: numberChip}, { id: id } ] } )
//         .then(pet => {
//             if(!pet) {
//                 if(numberChip)throw new NotFoundError(`pet with numberChip ${numberChip} does not exist`)
//                 else{
//                     throw new NotFoundError(`pet with id ${id} does not exist`)
//                 }
//             }

//             return pet
//         })
// }



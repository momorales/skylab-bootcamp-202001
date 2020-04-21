import { NotAllowedError } from 'pet-care-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL

export default (function (dateOfBirth, specie, sex, sterilized, weight, race, typeOfRace, fur, idPet, user) {

    // const {sub:id} = user
    const updateDate = new Date()
    
    return (async () => {
        const response = await fetch(`${API_URL}/user/update/pet/${idPet}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },

            body: JSON.stringify({ birthDate: dateOfBirth, specie, sex, race, typeRace: typeOfRace, fur, sterilized, weight, created: updateDate })

        })

        const { status } = response


        if (status === 200) return


        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)
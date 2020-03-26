import { NotAllowedError } from 'pet-care-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL

export default (function (chipNumber, Name, dateOfBirth, specie, sex,sterilized, weight, race, typeOfRace, fur, user,createdDate, diagnostic) {

    const {sub:id} = user

    return (async () => {
        const response = await fetch(`${API_URL}/user/${id}/pet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numberChip: chipNumber, name: Name, birthDate: dateOfBirth, specie, sex, race, typeRace: typeOfRace, fur, sterilized, weight, created:createdDate, diagnostic })
        })

        const { status } = response

        if (status === 201) return

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
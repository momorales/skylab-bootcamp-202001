import { NotAllowedError } from 'pet-care-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL


export default (function (user, eventDate) {

    const {sub:id} = user

    return (async () => {
        const response = await fetch(`${API_URL}/user/${id}/deleteAlert/${eventDate}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })
        const { status } = response

        if (status === 200) {
            return 
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)
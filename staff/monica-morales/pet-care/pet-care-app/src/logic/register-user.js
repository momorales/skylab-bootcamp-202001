import { validate } from 'pet-care-utils'
import { NotAllowedError } from 'pet-care-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL

export default (function (name, username, email, password) {

    validate.string(name, 'name')
    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')


    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, email, password })
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
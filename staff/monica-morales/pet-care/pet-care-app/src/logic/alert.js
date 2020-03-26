import { validate } from 'pet-care-utils'
import context from './context'

const { NotFoundError } = require('pet-care-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (alert) {
    const {subject, description, telephone, creation, evenDate} = alert

    validate.string(subject, 'subject')
    validate.string(description, 'description')
    validate.string(telephone, 'telephone')
    validate.type(creation, 'creation', Date)
    validate.type(evenDate, 'eventDate', Date)
   

    let alerts
 
    return fetch(`${API_URL}/user/${id}/alerts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}` }
    })
        .then(response => {

            const { status } = response

            if (status >= 400 && status < 500) {

                const { error } = response.json()

                if (status === 404) {
                    throw new NotFoundError(error)
                }

                throw new Error(error)

            }

            if (status === 200) {
                const alert = response.json()
                alert = alert.subject
                return alerts
            }
        })
}).bind(context)
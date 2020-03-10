const { models } = require('mongoose')
const { user, pet, appointment, alert, diagnostic } = require('./schemas')

module.exports = {
    User: models('User', user),
    Pet: models('Pet', pet),
    Appointment: models('Appointment', appointment),
    Alert: models('Alert', alert),
    Diagnostic: models('Diagnostic', diagnostic)
}



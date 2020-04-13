
module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createPet: require('./create-pet'),
    detailPet: require('./detail-pet'),
    retrievePets: require('./retrieve-pets'),
    retrievePetsOwned: require('./retrieve-pets-owned'),
    createAlert: require('./create-alert'),
    retrieveAlerts: require('./retrieve-alerts'),
    detailAlert: require('./detail-alert'),
    createAppointment: require('./create-appointment'),
    deleteAppointment: require('./delete-appointment'),
    retrieveNextAppointments: require ('./retrieve-nextAppointments'),
    createDiagnostic: require('./create-diagnostic'),
    retrieveDiagnostic: require('./retrieve-diagnostic'),
    retrieveDiagnostics: require('./retrieve-diagnostics'),
    retrieveVetAppointments:require('./retrieve-vet-appointments'),
    deletePet: require('./delete-pet'),
    updatePet: require('./update-pet'),
    deleteAlert: require('./delete-alert')
}
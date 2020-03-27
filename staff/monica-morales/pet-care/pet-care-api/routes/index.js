const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createPet,
    detailPet,
    retrievePets,
    retrievePetsOwned,
    createAlert,
    retrieveAlerts,
    detailAlert,
    createAppointment,
    deleteAppointment,
    retrieveNextAppointments,
    createDiagnostic,
    retrieveDiagnostic,
    retrieveDiagnostics,
    retrieveVetAppointments,
    deletePet,
    updatePet
    
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

//USERS

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

//PETS

router.post('/user/:id/pet', jsonBodyParser, createPet)

router.get('/user/:id/mypets', jwtVerifierMidWare, retrievePetsOwned)

router.get('/user/:id/pet/:petId',jwtVerifierMidWare, detailPet)

router.delete('/user/:id/delete/pet/:idPet', jwtVerifierMidWare, deletePet )

router.patch('/user/:id/update/pet/:idPet', jwtVerifierMidWare, jsonBodyParser, updatePet )


//ALERTS

router.post('/user/:id/pet/:petId/alert', jwtVerifierMidWare, jsonBodyParser, createAlert)

router.get('/user/:id/alerts', jwtVerifierMidWare, retrieveAlerts)

router.get('/user/:id/alerts/:idAlert', jwtVerifierMidWare, detailAlert)


// DIAGNOSTICS

router.post('/user/:id/pet/:petId/diagnostic', jwtVerifierMidWare,jsonBodyParser, createDiagnostic)

router.get('/user/:id/pet/:idPet/diagnostics',jwtVerifierMidWare, retrieveDiagnostics)

router.get('/user/:id/pet/:idPet/diagnostic/:idDiagnostic',jwtVerifierMidWare, retrieveDiagnostic)


// APPOINTMENTS

router.post('/user/:id/pet/:petId/appointment', jwtVerifierMidWare,jsonBodyParser, createAppointment)

router.get('/user/:id/pets/appointments', jwtVerifierMidWare,retrieveNextAppointments)

router.delete('/user/:id/pet/:petId/appointments/delete/:appointmentId', deleteAppointment )

// VET

router.get('/vet/:id/pets', jwtVerifierMidWare, retrievePets)

router.get('/vet/:id/appointments', jwtVerifierMidWare, retrieveVetAppointments)

module.exports = router







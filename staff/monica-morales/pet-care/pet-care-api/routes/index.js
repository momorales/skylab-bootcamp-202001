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
    createVisit,
    deleteAppointment,
    retrieveNextAppointments
    
} = require('./handlers')
const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

//rutas http

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/pet', jsonBodyParser, createPet)

router.get('/pets', retrievePets)

router.get('/pet', detailPet)

router.get('/pet/owned', jwtVerifierMidWare, retrievePetsOwned)

router.post('/pet/alert', jwtVerifierMidWare, jsonBodyParser, createAlert)

router.get('/pet/alert', jwtVerifierMidWare, retrieveAlerts)

router.get('/pet/alert', jwtVerifierMidWare, detailAlert )

router.post('/user/visit',jwtVerifierMidWare, jsonBodyParser, createVisit )

router.delete('/pet/:petId/visit/delete/:id', deleteAppointment )

router.get('/appointments/current', retrieveNextAppointments)


module.exports = router
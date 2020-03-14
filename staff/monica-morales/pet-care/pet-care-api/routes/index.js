const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createPet,
    detailPet,
    retrievePets,
    retrievePetsOwned,
    createAlert
    
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

router.post('/pet/alert', jwtVerifierMidWare, jsonBodyParser, createAlert )


module.exports = router
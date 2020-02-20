const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const { authenticateUser, retrieveUser, registerUser } = require('./logic')//importo todos los ficheros de logica
const bodyParser = require('body-parser') //metodo de express para parsear el body
const { Login, App, Home, Register, Landing } = require('./components') //importo todos los componentes
const { sessions } = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })//?

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express() //le aplico a app el modulo express de node

app.use(loggerMidWare) //para dar formato a los logger

app.use(express.static(path.join(__dirname, 'public'))) //carpetas estaticas

app.get('/', (req, res) => {
    res.send(App({ title: 'My App', body: Landing() })) //como contenedor es el APP, es el componente que tiene que cargar
})

app.get('/login', (req, res) => {
    //if (!loggedIn) {
        res.send(App({ title: 'Login', body: Login() }))
    //} else res.redirect(`/home/${loggedIn}`)
})

app.use(urlencodedBodyParser) //parsea el body

app.post('/authenticate', (req, res) => { //hacemos el authenticate
    const { username, password } = req.body

    try {
        authenticateUser(username, password)

        sessions.push(username)

        res.redirect(`/home/${username}`) //cambia lo que se pinta en la url
    } catch ({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})

app.get('/home/:username', (req, res) => { //busca la ruta y si conincide actua
    const { params: { username } } = req

    if (sessions.includes(username)) { //comprueba que el usuario sea el logado
        const { name } = retrieveUser(username) //cogemos el name del user que te retorna retrieveUser

        res.send(App({ title: 'Home', body: Home({ name, username }) }))//si estas logueado te pinta home
    } else res.redirect('/login')//si no estas logueado te redirige a login
})

app.post('/logout', (req, res) => {//logout solo puede estar en home pq estas logueado
    const { body: { username } } = req //en el componente home tienes un form pq necesitas coger el username de la sesion actual y enviarla con POST al apretar el boton   

    const index = sessions.indexOf(username)//busco el index del usuario en sessions[]

    sessions.splice(index, 1)

    res.redirect('/login') //me cambia y redirige a login 
})

app.post('/register', (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')
    } catch ({ message }) {
        res.send(App({ title: 'Register', body: Register({ error: message }) }))
    }
})

app.get('/register', (req, res) => {
    res.send(App({ title: 'Register', body: Register() }))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})


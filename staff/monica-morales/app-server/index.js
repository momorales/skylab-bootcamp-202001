const express = require ('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const register = require('./logic/register')
const users = require('./utils/data')



const {argv: [, , port = 8080]} = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare));

app.use(express.static(path.join(__dirname, 'public')))

app.post('/authenticate', (req, res, next)=>{
    
    let data =''

    req.on ('data', chunk => {
        data +=chunk
    })

    req.on('end', () =>{
    
    let body ={}

        users.split('&').forEach(element => {
            const.key = element.split('=')[0]
            const.value = element.split('=')[1]
            body[key] = value
        })

        req.body = body
        next()
    })
},(req, res)=>{
    try {
        const {body:{username, password}} = req

        authenticate(username, password)

        retrieveUser(username){
            res.send(`<h1>Hello, ${username}`)

        res.end()
    } catch (error) {
        const rs = fs.createReadScream(path.join(__dirname, 'public/login-wrong.html'))
        rs.on('open', function(){
            rs.pipe(res)
        })
    }
}
})

app.listen(port)

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})

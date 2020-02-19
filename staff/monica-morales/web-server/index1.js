const net = require ('net')
const fs = require ('fs')
const log = require ('./logger')

log.info('starting server')

const { argv: [, , port = 8080] } = process

const server = net.createServer(socket => {

    socket.setEncoding('utf8')
    
    socket.on('data', chunk => {
        log.info(`request from ${socket.remoteAddress}:
${chunk}`)

        let path = chunk.toString().split('/')[1].split(' ')[0]

        if(!path) path = 'index.html'

        const rs = fs.createReadStream(`./${path}`)

        if(path !== 'favicon.ico'){
            console.log(path)
            rs.on('data', content => {
                socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin:\nContent-Type: text/html\n\n${content}\n`)
            })
            rs.on('error', error => {
                socket.end(`HTTP/1.1 404\n\nnot found`)
            })
        } else {
            socket.end(`HTTP/1.1 404\n\nnot found
<h1>NOT FOUND</h1>`)
        }
    })
})
server.listen(8080)

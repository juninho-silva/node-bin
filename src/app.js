const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const VM = require('vm')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.render('index.html')
});

io.on('connection', function(socket) {
    socket.on('send code', function(code) {
        const result = executeJavaScript(code)
        io.sockets.emit('result', result)
    })
})

http.listen(3000, () => {
    console.log('Listening on port: 3000')
})

const executeJavaScript = function(code) {
    console.log(code)
    return VM.runInThisContext(code)
}
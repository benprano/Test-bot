// Variables declaration
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

var fs = require('fs')
eval(fs.readFileSync(__dirname + '/bot.js')+'')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.emit('some event', { for: 'everyone' })

io.on('connection', function (socket) {
  socket.broadcast.emit('hi')
})

io.on('connection', function (socket) {
  console.log('a user connected')
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg)
  })
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
})
//
io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
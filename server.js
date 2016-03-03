'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app);
const ws = require('socket.io')(server)

// app environmental variables
const PORT = process.env.PORT || 3000

app.set('view engine', 'jade');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

//START LISTENING
server.listen( PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

//WEB SOCKET
ws.on('connection', socket =>{
  console.log("socket connected!")

  socket.on('sendChat', msg => {
    console.log('sending message', msg)
    socket.broadcast.emit('receiveChat', msg)
  })
})


const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/multiplayer', express.static(path.join(__dirname, 'multiDist')))
app.use('/twoplayer', express.static(path.join(__dirname, 'twoPlayerDist')))
app.use('/oneplayer', express.static(path.join(__dirname, 'onePlayerDist')))

const PORT = 3000
const server = app.listen((process.env.PORT || PORT), function() {
    console.log(`Server running on port ${PORT}`)
})

const io = require('socket.io')(server)
let counter = 1
io.on('connection', (socket) => {
    socket.on('join', () => {
        io.emit('join', counter++)
    })
    socket.on('start', (data) => {
        io.emit('start', data)
    })
    socket.on('move', (data) => {
        io.emit('move', data)
    })
    socket.on('disconnect', () => {
        if (counter > 1) {
            counter--
        }
    })
})
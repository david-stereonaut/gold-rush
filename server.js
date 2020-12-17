const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/multiplayer', express.static(path.join(__dirname, 'multiDist')))
app.use('/twoplayer', express.static(path.join(__dirname, 'twoPlayerDist')))


const port = 3000
app.listen((process.env.PORT || port), function() {
    console.log(`Server running on port ${port}`)
})
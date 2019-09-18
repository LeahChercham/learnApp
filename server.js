//External module inports
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./Server/routes/api')

mongoose.connect('mongodb://localhost/usersDB', { useNewUrlParser: true })

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use(express.static(path.join(__dirname, 'dist')))
server.use(express.static(path.join(__dirname, 'node_modules')))

server.use('/', api)

const port = '3000';
server.listen(port, function () { console.log('Running on ' + port) })

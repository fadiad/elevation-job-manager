const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const loginApi = require('./server/routes/loginApi')
const studentapi = require('./server/routes/studentApi')
const adminApi = require('./server/routes/adminApi')


// const moment = require('moment')

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/elevationJobManagerDB', { useNewUrlParser: true })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
  })


app.use('/', loginApi)
app.use('/studentPage', studentapi)
app.use('/adminPage', adminApi)

const port = 8888

app.listen(process.env.PORT || port, function() {
    console.log(`Runnin runnin and runnin runnin on port ${port}`)
})
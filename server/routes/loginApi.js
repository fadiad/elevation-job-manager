const express = require('express')
const router = express.Router()
const mocData = require("../models/mocData");


router.get('/loginPage', function(req, res) {
    console.log(mocData);
    res.send("Hello WORLD!")
})

router.get('/user', function(req, res) {
    console.log(mocData);
    const  obj = mocData.users[0]
    res.send(obj)
})

router.get('/Processes', function(req, res) {
    console.log(mocData);
    const  arrProcesses = mocData.processes
    res.send(arrProcesses)
})

module.exports = router
const express = require('express')
const router = express.Router()
const mocData = require("../models/mocData");


router.get('/loginPage', function(req, res) {
    console.log(mocData);
    res.send("Hello WORLD!")
})




module.exports = router
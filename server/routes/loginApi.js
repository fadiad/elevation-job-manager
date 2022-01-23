const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    console.log("x")
    res.send("Hello WORLD!")
})
module.exports = router
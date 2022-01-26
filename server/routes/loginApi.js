const express = require('express')
const router = express.Router()


router.get('/loginPage', function(req, res) {
    
    res.send("Hello WORLD!")
})


module.exports = router
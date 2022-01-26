const express = require('express')
const router = express.Router()
const mocData = require("../models/mocData");


const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost/jobManagerDB')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

router.get('/user', async function(req, res) {
    const email = req.query.email
    let user = await sequelize.query(`    
    select * 
    from userproporties inner join Candidate on userproporties.id = Candidate.id
    where userproporties.email = '${email}'
    `)
    console.log(user[0][0]);
    res.send(user[0][0])
})

router.get('/Processes', function(req, res) {
    const  arrProcesses = mocData.processes
    res.send(arrProcesses)
})

module.exports = router;
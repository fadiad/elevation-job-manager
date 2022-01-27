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

router.get('/userData/:id', function (req, res) { // id : user id 
    sequelize
        .query(`SELECT c.id , status , isEmployeed , cohort ,cv ,
                       firstName , lastName , email , phone
        FROM Candidate AS c  , UserProporties AS u
        WHERE c.id = '${req.params.id}' AND c.id = u.id`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})





router.get('/processes/:id', function (req, res) { // id : user id 
    sequelize
        .query(`SELECT p.id , p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
    FROM Candidate AS c  , Process AS p
    WHERE UserId = '${req.params.id}' AND c.id = p.UserId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/processes/:id', async function (req, res) { // id : user id

    let query = `INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
                VALUES(NULL,'${req.body.companyName}','${req.body.jobTitle}','${req.body.location}','${req.body.foundBy}','${req.body.link}',${req.params.id});`
    let result = await sequelize.query(query)

    sequelize
        .query(`SELECT p.id , p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
FROM Candidate AS c  , Process AS p
WHERE UserId = '${req.params.id}' AND c.id = p.UserId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
    // res.send(result)
})


router.get('/interviews/:id', function (req, res) { // id : process id 
    sequelize
        .query(`SELECT i.id , i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId
    FROM Process AS p , Interview AS i
    WHERE i.processId = '${req.params.id}' AND  p.id = i.processId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/interviews', async function (req, res) { // id : process id
    let query = `INSERT INTO Interview(type , date ,interviewerName,status,processId)
        VALUES("${req.body.type}", "${req.body.date}" ,"${req.body.interViewerName}","${req.body.status}",${req.body.processId});`
    let result = await sequelize.query(query)
    res.send(result)
})

module.exports = router;
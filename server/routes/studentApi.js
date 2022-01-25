const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/jobmanagerdb')


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
        .query(`SELECT p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
    FROM Candidate AS c  , Process AS p
    WHERE UserId = '${req.params.id}' AND c.id = p.UserId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/processes/:id', async function (req, res) { // id : user id
    let query = `INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
                VALUES(NULL,"${req.body.companyName}","${req.body.jobTitle}","${req.body.location}","${req.body.foundBy}","${req.body.link}",${req.body.UserId});`
    let result = await sequelize.query(query)
    res.send(result)
})






router.get('/interviews/:id', function (req, res) { // id : process id 
    sequelize
        .query(`SELECT i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId
    FROM Process AS p , Interview AS i
    WHERE i.processId = '${req.params.id}' AND  p.id = i.processId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/interviews/:id', async function (req, res) { // id : process id
    let query = `INSERT INTO Interview(type,interviewerName,status,processId)
                VALUES("${req.body.type}","${req.body.interviewerName}","${req.body.status}",${req.body.processId});`
    let result = await sequelize.query(query)
    res.send(result)
})



module.exports = router;




/*

You can send an object such as bellow , to the link http://localhost:8888/studentPage/processes/id
to save a process to a specific user , AND the id in the link belonges to the user.
{
    "companyName" : "sony",
    "jobTitle" : "team manager",
    "location" : "tel aviv",
    "foundBy":"friend",
    "link" : "link...",
    "UserId": 1
}



You can send an object such as bellow , to the link http://localhost:8888/studentPage/interviews/1
to save an enterview to a specific process , AND the id in the link belonges to the process.

{
    "type" : "phone",
    "interviewerName" : "amir",
    "status" : "pending",
    "processId":1
}

*/
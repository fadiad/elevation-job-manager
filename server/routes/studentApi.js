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
    const arrProcesses = mocData.processes
    res.send(arrProcesses)
})

router.get('/userData/:id', function(req, res) { // id : user id 
    sequelize
        .query(`SELECT c.id , status , isEmployeed , cohort ,cv ,
                       firstName , lastName , email , phone
        FROM Candidate AS c  , UserProporties AS u
        WHERE c.id = '${req.params.id}' AND c.id = u.id`)
        .then(function([results, metadata]) {
            res.send(results)
        })
})





router.get('/processes/:id', function(req, res) { // id : user id 
    sequelize
        .query(`SELECT p.id , p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
    FROM Candidate AS c  , Process AS p
    WHERE UserId = '${req.params.id}' AND c.id = p.UserId  ORDER BY p.status DESC`)
        .then(function([results, metadata]) {
            res.send(results)
        })
})

router.post('/processes/:id', async function(req, res) { // id : user id

    let query = `INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
                VALUES(NULL,'${req.body.companyName}','${req.body.jobTitle}','${req.body.location}','${req.body.foundBy}','${req.body.link}',${req.params.id});`
    await sequelize.query(query)

    sequelize
        .query(`SELECT p.id , p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
FROM Candidate AS c  , Process AS p
WHERE UserId = '${req.params.id}' AND c.id = p.UserId`)
        .then(function([results, metadata]) {
            res.send(results)
        })
        // res.send(result)
})




router.get('/interviews/:id', function(req, res) { // id : process id 
        sequelize
            .query(`SELECT i.id, i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId
    FROM Process AS p , Interview AS i
    WHERE i.processId = '${req.params.id}' AND  p.id = i.processId`)
            .then(function([results, metadata]) {
                res.send(results)
            })
    })
    // function converDate () {
    //     Date.prototype.toYMD = Date_toYMD;
    //     function Date_toYMD() {
    //         var year, month, day;
    //         year = String(this.getFullYear());
    //         month = String(this.getMonth() + 1);
    //         if (month.length == 1) {
    //             month = "0" + month;
    //         }
    //         day = String(this.getDate());
    //         if (day.length == 1) {
    //             day = "0" + day;
    //         }
    //         return year + "-" + month + "-" + day;
    //     }
    // }
router.post('/interviews', async function(req, res) { // id : process id

    let date = req.body.date.toString().slice(0, 10)

    let query = `INSERT INTO Interview(type , date ,interviewerName,status,processId)
        VALUES("${req.body.type}", "${date}" ,"${req.body.interViewerName}","${req.body.status}",${req.body.processId});`
    let result = await sequelize.query(query)
    res.send(result)
})

router.post('/interViewStatus/:id', async function(req, res) {
    let interViewId = req.body.interViewId;
    let processId = req.body.processId;
    let status = req.body.status;
    console.log("Entered change status")
    console.log(req.body)
    let query = `Update interview SET STATUS="${status}" WHERE id=${interViewId} AND processId=${processId};`
    let result = await sequelize.query(query)
    if (status === "Failed") {
        let processQuery = `Update Process SET status="Failed" WHERE id=${processId};`
        await sequelize.query(processQuery)
    }
    res.send(result)
})


router.post('/processStatus', async function(req, res) {
    // process status 
    // status ENUM('In progress','Passed','Failed') DEFAULT 'In progress' NOT NULL,

    // Candidate
    // isEmployeed BOOLEAN
    console.log(req.body)
    let processQuery = `Update Process SET status="Passed" WHERE id=${req.body.processId};`
    let processResult = await sequelize.query(processQuery)
    let userQuery = `Update Candidate SET isEmployeed="1" WHERE id=${req.body.userID};`
    let userResult = await sequelize.query(userQuery)
    res.send("result")
})

// -------------------------------------


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
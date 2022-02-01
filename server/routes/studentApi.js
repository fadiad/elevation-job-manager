const express = require('express')
const router = express.Router()
const mocData = require("../models/mocData");
const nodemailer = require("nodemailer");


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

router.get('/user', async function (req, res) {
    const email = req.query.email
    let user = await sequelize.query(`    
    select * 
    from userproporties inner join Candidate on userproporties.id = Candidate.id
    where userproporties.email = '${email}'
    `)
    console.log(user[0][0]);
    res.send(user[0][0])
})

router.get('/Processes', function (req, res) {
    const arrProcesses = mocData.processes
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
    WHERE UserId = '${req.params.id}' AND c.id = p.UserId  ORDER BY p.status DESC`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/processes/:id', async function (req, res) { // id : user id

    let query = `INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
                VALUES(NULL,'${req.body.companyName}','${req.body.jobTitle}','${req.body.location}','${req.body.foundBy}','${req.body.link}',${req.params.id});`
    await sequelize.query(query)

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
        .query(`SELECT i.id, i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId
    FROM Process AS p , Interview AS i
    WHERE i.processId = '${req.params.id}' AND  p.id = i.processId`)
        .then(function ([results, metadata]) {
            res.send(results)
        })
})

router.post('/interviews', async function (req, res) { 
    let date = req.body.date.toString().slice(0, 10)
    let query = `INSERT INTO Interview(type , date ,interviewerName,status,processId)
        VALUES("${req.body.type}", "${date}" ,"${req.body.interViewerName}","${req.body.status}",${req.body.processId});`
    let result = await sequelize.query(query)
    res.send(result)
})

router.post('/interViewStatus/:id', async function (req, res) {
    let interViewId = req.body.interViewId;
    let processId = req.body.processId;
    let status = req.body.status;
    
    let query = `Update interview SET STATUS="${status}" WHERE id=${interViewId} AND processId=${processId};`
    let result = await sequelize.query(query)
    if (status === "Failed") {
        let processQuery = `Update Process SET status="Failed" WHERE id=${processId};`
        await sequelize.query(processQuery)
    }
    let adminData = await sequelize.query(`select u.email , u.firstName
        from admin As a inner join userproporties As u  on a.id = u.id 
        where a.isNotified = 1`
    )
    const adminName =adminData[0][0].firstName
    const adminEmail = adminData[0][0].email
    const userData = await sequelize.query(`
            select u.firstName , u.lastName , u.email , i.type , p.companyName , i.status
            from Interview As i inner join process As p on i.processId = p.id
            inner join candidate As c on c.id = p.UserId 
            inner join userproporties As u on u.id = c.id
            where i.id =${interViewId}`)
    const userName = userData[0][0].firstName 
    const lastName = userData[0][0].lastName
    const userEmail = userData[0][0].email
    const interviewType = userData[0][0].type
    const CompanyName = userData[0][0].companyName
    adminData[0].forEach(admin => {
       


       let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'elevation744',
            pass: 'Atedna4!@#'
        }
    });
    let mailOptions
    if (status === "Passed" &&  interviewType === "Contract") {
        mailOptions = {
            from: 'elevation744@gmail.com',
            to: admin.email,
            subject: userName + " " + lastName + " , "  + " Passed the " + interviewType + " interview",
            text: 'Hello ' + admin.firstName  + userName + " " + lastName +' passed the interview and signed a contract with ' +  CompanyName
        };
    }
    else if (status === "Failed") {
        mailOptions = {
            from: 'elevation744@gmail.com',
            to: admin.email,
            subject: userName + " " + lastName + " , "  + " Failed the " + interviewType + " interview",
            text: 'Hello ' + admin.firstName + " " + userName + " " + lastName +' failed the interview in ' +  CompanyName
        };
    }else if (status === "Passed") {
        mailOptions = {
            from: 'elevation744@gmail.com',
            to: admin.email,
            subject: userName + " " + lastName +" , " + " Passed the " + interviewType + " interview",
            text: 'Hello ' + adminName  + userName + " " + lastName +' Passed the interview in ' +  CompanyName
        };
    }
   
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

    });

res.send(result)
})

router.post('/processStatus', async function(req, res) {
 
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
const express = require('express')
const router = express.Router()
const mocData = require("../models/mocData");
const nodemailer = require("nodemailer");


const Sequelize = require('sequelize');
const { and } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost/jobManagerDB')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

router.get('/jobs/:id', async function(req, res) {

    let jobs = await sequelize.query(
        `
        SELECT *
        from joboffer As jOffer  inner join job As j On jOffer.jobId =j.id 
        WHERE jOffer.candidateId ='${req.params.id}'
    `)
    res.send(jobs[0])
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
router.get('/Simulations/:id', async function(req, res) { // id : user id 

    let Simulations = await sequelize.query(
        `
                select  i.type , p.companyName ,  p.jobTitle , i.date ,DATE_FORMAT(i.simulationDate, "%Y-%m-%d %T") as simulationDate
                from userproporties As u inner join Candidate As c   On u.id=c.id
                inner join Process As  p On p.UserId=c.id 
                inner join Interview As i On i.processId = p.id 
                where u.id ='${req.params.id}' and i.simulationDate != 'null'
        `)
    res.send(Simulations[0])
})

router.get('/processes/:id', function(req, res) { // id : user id 
    sequelize
        .query(`SELECT p.id , p.companyName , p.jobTitle , p.location , p.foundBy , p.link , p.status
    FROM Candidate AS c  , Process AS p
    WHERE UserId = '${req.params.id}' AND c.id = p.UserId  ORDER BY p.status= 'In progress' DESC`)
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

// =============================================

router.get('/interviews/:id', async function(req, res) { // id : process id 

    await updateInterViewsStatusByDate(req.params.id)


    sequelize
        .query(`SELECT i.id, i.type , i.date , DATE_FORMAT(i.simulationDate, "%Y-%m-%d %T") as simulationDate , i.interviewerName , i.status , i.processId
    FROM Process AS p , Interview AS i
    WHERE i.processId = '${req.params.id}' AND  p.id = i.processId`)
        .then(function([results, metadata]) {
            res.send(results)
        })
})

async function updateInterViewsStatusByDate(processId) {

    const threeWeeks = 21
    const oneDay = 1

    sequelize
        .query(`SELECT i.id,  i.date , i.status 
                FROM  Interview AS i
                WHERE i.processId = '${processId}'  and i.status ='Scheduled'`)
        .then(async function([results, metadata]) {
            console.log(results);
            for (let interview of results) {
                if (interviewDatePassedByDays(interview.date, threeWeeks)) {
                    let query = `Update interview SET STATUS="No Reply" WHERE id=${interview.id};`
                    let result = await sequelize.query(query)
                } else if (interviewDatePassedByDays(interview.date, oneDay)) {
                    let query = `Update interview SET STATUS="Pending" WHERE id=${interview.id};`
                    let result = await sequelize.query(query)
                }
            }
        })
}

function interviewDatePassedByDays(iDate, days) {

    let theDateAfterDays = new Date(iDate);
    theDateAfterDays.setDate(theDateAfterDays.getDate() + days);

    let todayDate = new Date()

    if (todayDate.getTime() > theDateAfterDays.getTime()) {
        return true
    } else {
        return false
    }
}

router.post('/interviews', async function(req, res) {
    let date = req.body.date.toString().slice(0, 10)
    await updateStatus(req.body.processId)
    let query = `INSERT INTO Interview(type , date ,interviewerName,status,processId)
        VALUES("${req.body.type}", "${date}" ,"${req.body.interViewerName}","${req.body.status}",${req.body.processId});`
    let result = await sequelize.query(query)
    let interviewData = await sequelize.query(
        `
        select i.id as interviewerId , p.id as processId , i.status,  i.type  
        from Interview AS i inner join process As p On i.processId=p.id 
        where i.id =  ${result[0]}
    `)
    sentEmail(interviewData[0][0].interviewerId, interviewData[0][0].processId, interviewData[0][0].status)
    res.send(result)
})
async function updateStatus(processId) {

    let interviews = await sequelize.query(
        `
        select *
        from Interview As i 
        where i.processId = '${processId}' && i.status != "Passed"
    `
    )
    if (interviews[0] !== 0) {
        for (let i = 0; i < interviews[0].length; i++) {
            let query = `Update interview SET STATUS="Passed" WHERE id='${interviews[0][i].id}' AND processId=${processId};`
            let result = await sequelize.query(query)
        }
    }
}

router.post('/interViewStatus/:id', async function(req, res) {
    let interViewId = req.body.interViewId;
    let processId = req.body.processId;
    let status = req.body.status;
    let query = `Update interview SET STATUS="${status}" WHERE id=${interViewId} AND processId=${processId};`
    let result = await sequelize.query(query)
    if (status === "Failed") {
        let processQuery = `Update Process SET status="Failed" WHERE id=${processId};`
        await sequelize.query(processQuery)
    }
    sentEmail(interViewId, processId, status)
    res.send(result)
})

async function sentEmail(interViewId, processId, status) {

    let adminData = await sequelize.query(`
    select  a.id , u.email , u.firstName
    from admin As a inner join userproporties As u  on a.id = u.id
    inner join notificationforadmin As nfa On nfa.adminId = u.id 
    inner join notificationtype As nt On nt.id = nfa.notificationId
    group BY a.id
    `)
    const adminName = adminData[0][0].firstName
    const adminEmail = adminData[0][0].email
    const userData = await sequelize.query(`
        select u.firstName , u.lastName , u.email , i.type , p.companyName , i.status , i.date
        from Interview As i inner join process As p on i.processId = p.id
        inner join candidate As c on c.id = p.UserId
        inner join userproporties As u on u.id = c.id
        where i.id=${interViewId}`)
    const userName = userData[0][0].firstName
    const lastName = userData[0][0].lastName
    const userEmail = userData[0][0].email
    const interviewType = userData[0][0].type
    const CompanyName = userData[0][0].companyName
    const date = userData[0].date
    if (interviewType !== 'Phone') {


        adminData[0].forEach(async admin => {

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'elevation744',
                    pass: 'Atedna4!@#'
                }
            });
            const isNotifiedByNewInterviewAndType = await sequelize.query(`
            select  nfa.isNotified
            from admin As a inner join userproporties As u  on a.id = u.id
            inner join notificationforadmin As nfa On nfa.adminId = u.id 
            inner join notificationtype As nt On nt.id = nfa.notificationId
            where  a.id ='${admin.id}' && nt.type1 = 'newInterview' && nt.type2= '${interviewType}'
            `)
            const isNotifiedByContractInterview = await sequelize.query(`
            select  nfa.isNotified 
            from admin As a inner join userproporties As u  on a.id = u.id
            inner join notificationforadmin As nfa On nfa.adminId = u.id 
            inner join notificationtype As nt On nt.id = nfa.notificationId
            where  a.id ='${admin.id}' && nt.type1 = 'Contract' && nt.type2= 'General'
            LIMIT 1;
        `)
            const isNotifiedByPassFailInterviewAndType = await sequelize.query(`
        select  nfa.isNotified 
        from admin As a inner join userproporties As u  on a.id = u.id
        inner join notificationforadmin As nfa On nfa.adminId = u.id 
        inner join notificationtype As nt On nt.id = nfa.notificationId
        where  a.id ='${admin.id}' && nt.type1 = 'Pass/Fail' && nt.type2= '${interviewType}'
        `)
            let mailOptions

            if (status === "Scheduled" && isNotifiedByNewInterviewAndType[0][0].isNotified) {
                mailOptions = {
                    from: 'elevation744@gmail.com',
                    to: admin.email,
                    subject: userName + " " + lastName + " ,  has " + interviewType + " interview",
                    text: 'Hello ' + admin.firstName + " , " + userName + " " + lastName + ' has a new interview on ' + date + " at " + CompanyName
                };
            }


            if (status === "Passed" && isNotifiedByContractInterview[0][0].isNotified) {
                mailOptions = {
                    from: 'elevation744@gmail.com',
                    to: admin.email,
                    subject: userName + " " + lastName + " ,  Passed the " + interviewType + " interview",
                    text: 'Hello ' + admin.firstName + " , " + userName + " " + lastName + ' passed the interview and signed a contract with ' + CompanyName
                };
            } else if (status === "Failed" && isNotifiedByPassFailInterviewAndType[0][0].isNotified) {
                mailOptions = {
                    from: 'elevation744@gmail.com',
                    to: admin.email,
                    subject: userName + " " + lastName + " ,  Failed the " + interviewType + " interview",
                    text: 'Hello ' + admin.firstName + " , " + userName + " " + lastName + ' failed the interview in ' + CompanyName
                };
            } else if (status === "Passed" && isNotifiedByPassFailInterviewAndType[0][0].isNotified) {
                mailOptions = {
                    from: 'elevation744@gmail.com',
                    to: admin.email,
                    subject: userName + " " + lastName + " ,  Passed the " + interviewType + " interview",
                    text: 'Hello ' + adminName + " , " + userName + " " + lastName + ' Passed the interview in ' + CompanyName
                };
            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })

        });
    }
}
router.post('/processStatus', async function(req, res) {

    console.log(req.body)
    let processQuery = `Update Process SET status="Passed" WHERE id=${req.body.processId};`
    let processResult = await sequelize.query(processQuery)
    let interviewQuery = `UPDATE INTERVIEW SET status="Passed" WHERE processId=${req.body.processId};`
    let interviewResult = await sequelize.query(interviewQuery)
    let userQuery = `Update Candidate SET isEmployeed="1" WHERE id=${req.body.userID};`
    let userResult = await sequelize.query(userQuery)
    res.send("result")
})

router.post('/question', async function(req, res) {
    const interviewId = req.body.interviewId

    let query = `INSERT INTO Questions(id ,title , question , solution , InterviewId  )
        VALUES(NULL, "${req.body.title}","${req.body.question}" , NULL , "${interviewId}");`
    await sequelize.query(query)
    let questionData = await sequelize.query(
        `
            SELECT p.jobTitle , p.companyName ,  i.type 
            FROM questions As q inner join interview As i On q.interviewId = i.id
            inner join process As p On p.id = i.processId
            where q.InterviewId = '${interviewId}'
        `)
    sentQuestionEmail(questionData[0])
        // res(result)
})
async function sentQuestionEmail(questionData) {
    let adminData = await sequelize.query(`
    select  a.id , u.email , u.firstName
    from admin As a inner join userproporties As u  on a.id = u.id
    inner join notificationforadmin As nfa On nfa.adminId = u.id 
    inner join notificationtype As nt On nt.id = nfa.notificationId
    group BY a.id
    `)
    adminData[0].forEach(async admin => {
        const isNotifiedByQuestion = await sequelize.query(`
        select  nfa.isNotified
        from admin As a inner join userproporties As u  on a.id = u.id
        inner join notificationforadmin As nfa On nfa.adminId = u.id 
        inner join notificationtype As nt On nt.id = nfa.notificationId
        where  a.id ='${admin.id}' && nt.type1 = 'newQuestion' 
        `)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'elevation744',
                pass: 'Atedna4!@#'
            }
        });
        let mailOptions
        if (isNotifiedByQuestion[0][0].isNotified) {
            mailOptions = {
                from: 'elevation744@gmail.com',
                to: admin.email,
                subject: "student added a new question from an interview",
                text: 'Hello ' + admin.firstName + " ,  A new question was added from " + questionData[0].jobTitle + " a " + questionData[0].type + " job interview at " + questionData[0].companyName
            };
        }
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    });
}
// -------------------------------------
router.get('/simulationDates/:id', async function(req, res) {
    console.log("simulationDates")
    let userId = req.params.id
    let simualtionDataQuery = `select s.id as "SimulationId", c.id as "UserID",p.id as "ProcessID",p.companyName,p.jobTitle,i.id as "interviewId",i.type,i.date,i.simulationDate,
    DATE_FORMAT(s.date1, "%Y-%m-%d %T") as date1,
    DATE_FORMAT(s.date2, "%Y-%m-%d %T") as date2,
    DATE_FORMAT(s.date3, "%Y-%m-%d %T") as date3,adminId 
       from candidate as c inner join process as p on c.id=p.UserId 
       inner join interview as i on p.id=i.processId 
       inner join simulation as s on i.id=s.interviewId
       where c.id=${userId} and i.simulationDate is  null;`
    let result = await sequelize.query(simualtionDataQuery);
    res.send(result[0])
})

router.post('/interviewSimlationDate/:id', async function(req, res) {
    let userId = req.params.id
    let interviewId = req.body.interviewId
    let date = req.body.date
        //Set simulationDate=DATE_FORMAT(${date}, "%d/%m/%Y %r") 
    let update = `UPDATE Interview Set simulationDate="${date}"
    where id=${interviewId} `
    let result = await sequelize.query(update)
    let SimlationData = await sequelize.query(`select u.firstName , u.lastName
    from interview As i inner join process As p On i.processId = p.id
                        inner join candidate As c  On c.id = p.UserId
                        inner join userproporties As u On u.id = c.id
                        where i.id = '${interviewId}'
    `)
    sentSimlationEmail(date, SimlationData[0])
    res.send(result)
})

async function sentSimlationEmail(date, questionData) {
    let adminData = await sequelize.query(`
    select  a.id , u.email , u.firstName
    from admin As a inner join userproporties As u  on a.id = u.id
    inner join notificationforadmin As nfa On nfa.adminId = u.id 
    inner join notificationtype As nt On nt.id = nfa.notificationId
    group BY a.id
    `)
    adminData[0].forEach(async admin => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'elevation744',
                pass: 'Atedna4!@#'
            }
        });
        let mailOptions
        mailOptions = {
            from: 'elevation744@gmail.com',
            to: admin.email,
            subject: "student added a new question from an interview",
            text: 'Hello ' + admin.firstName + questionData[0].firstName + " " + questionData[0].idkeidek + "chose the date " + date + " for an interview simulation"
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    });
}
router.delete('/Simulation/:id', async function(req, res) {
        let sId = req.body.simulationId
        let deleteQuery = `Delete from Simulation where id=${sId}`
        let result = await sequelize.query(deleteQuery)
        res.send(result)
    })
    // -------------------------------------


router.put('/profileDetails', async function(req, res) {

    if (req.body.name) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                firstName = "${req.body.name}"
              WHERE
                  id = "${req.body.userID}"`)
    }

    if (req.body.lastName) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                lastName = "${req.body.lastName}"
              WHERE
                id = "${req.body.userID}"`)
    }

    if (req.body.password) {
        await sequelize.query(`UPDATE userproporties 
              SET         
              password = "${req.body.password}"
              WHERE
                id = "${req.body.userID}"`)
    }

    if (req.body.phone) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                phone = ${req.body.phone}
              WHERE
                id = "${req.body.userID}"`)
    }
    res.send("sucess")
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
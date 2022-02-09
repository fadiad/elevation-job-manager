/* eslint-disable no-const-assign */
const express = require('express')
const router = express.Router()


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

router.post('/job', async function(req, res) {
    let userId = req.body.userId
    let adminId = req.body.adminId
    let company = req.body.company
    let jobNumber = req.body.jobNumber
    let jobTitle = req.body.jobTitle
    let description = req.body.description
    let link = req.body.link
    let date = req.body.date.toString().slice(0, 10)
    let users = req.body.usersSelected
    let query =
        `
        INSERT INTO job(id ,adminId,companyName,jobTitle,link,jobNumber,description , creatingJobDate)
        VALUES(NULL,"${adminId}","${company}","${jobTitle}","${link}","${jobNumber}" ,"${description}" , "${date}");
        `
    await sequelize.query(query)

    const newJob = await sequelize.query(query)
    for (let user of users) {
        let queryJobOffer =
            `
            INSERT INTO joboffer(jobId ,adminId, candidateId , date)
            VALUES("${newJob[0]}","${adminId}","${user.id}" , "${date}");
             `
        await sequelize.query(queryJobOffer)
    }
    res.send(newJob)
})
router.get('/candidate', async function(req, res) {

    const qustions = await sequelize.query(` 
        select *
        from Candidate As c inner join UserProporties As u 
        On c.id = u.id
        `)
    res.send(qustions[0])
})

router.get('/AdminData', function(req, res) {
    res.send("lotem")
})

router.get('/AdminAllData/:id', function(req, res) { // id : user id 
    sequelize
        .query(`SELECT *
        FROM Admin AS a  , UserProporties AS u
        WHERE a.id = '${req.params.id}' AND a.id = u.id`)
        .then(function([results, metadata]) {
            console.log(results);
            res.send(results)
        })
})


router.get('/qustions', async function(req, res) {
    const qustions = await sequelize.query(`    
    SELECT q.id As questionId ,q.InterviewId ,q.title, q.question , q.solution , i.type , p.jobTitle , p.companyName , i.date ,u.firstName , u.lastName 
    FROM Questions As q inner join Interview As i On q.InterviewId = i.id
                        inner join Process As p On i.processId = p.id 
                        inner join Candidate As c On c.id = p.UserId 
                        inner join userproporties As u On c.id = u.id 
                        ORDER BY i.id
    `)
    res.send(qustions[0])
})

router.post('/setNotificationsType', async function(req, res) {

    let wanted = req.body.wanted
    let unWanted = req.body.unWanted
    let adminId = req.body.adminId

    let query0 = `Delete from NotificationForAdmin WHERE adminId = ${adminId}`
    let result0 = await sequelize.query(query0)

    for (let notification of wanted) {
        let query1 = `INSERT INTO NotificationType(id,type1,type2)
        VALUES(NULL,"${notification.type1}","${notification.type2}");`
        let result1 = await sequelize.query(query1)
        let notificationTypeId = result1[0]

        let query2 = `INSERT INTO NotificationForAdmin(adminId,notificationId,isNotified)
        VALUES(${adminId},${notificationTypeId},1);`
        let result2 = await sequelize.query(query2)
    }

    for (let notification of unWanted) {
        let query1 = `INSERT INTO NotificationType(id,type1,type2)
        VALUES(NULL,"${notification.type1}","${notification.type2}");`
        let result1 = await sequelize.query(query1)
        let notificationTypeId = result1[0]

        let query2 = `INSERT INTO NotificationForAdmin(adminId,notificationId,isNotified)
        VALUES(${adminId},${notificationTypeId},0);`
        let result2 = await sequelize.query(query2)
    }
    res.send("succeed")
})

router.post('/resetNotifications', async function(req, res) {
    console.log(req.body);
    let query0 = `Delete from NotificationForAdmin WHERE adminId = ${req.body.adminId}`
    let result0 = await sequelize.query(query0)
    res.send("succeed")
})

router.get('/notificationsType/:adminId', async function(req, res) {

    sequelize
        .query(`SELECT type1 ,type2
             FROM Admin AS a  , NotificationType AS NT , NotificationForAdmin AS NFA
            WHERE a.id = '${req.params.adminId}' AND a.id = NFA.adminId AND NT.id = NFA.notificationId AND NFA.isNotified = 1`)
        .then(function([results, metadata]) {
            res.send(results)
        })
})


router.delete('/question', async function(req, res) {
    const questionDeleted = await sequelize.query(`
    DELETE FROM questions
    WHERE id = "${req.body.questionId}"
    `)
    res.send(questionDeleted[0])

})
router.put('/question', async function(req, res) {
    const editQuestionData = await sequelize.query(`
  UPDATE questions 
    SET         
        title = "${req.body.title}",
        question = "${req.body.question}",
            solution ="${req.body.sulotion}"

    WHERE
        id = "${req.body.questionId}"
   
`)
    res.send(editQuestionData[0])
})

router.put('/sulotion', async function(req, res) {

    const sulotion = await sequelize.query(`
    UPDATE questions 
    SET 
        solution = "${req.body.sulotion}"
    WHERE
        id = "${req.body.questionId}"
        `)
    res.send(sulotion[0])

})

router.post('/simulation', async function(req, res) {
    // let primaryDate = req.body.primaryDate.toString().slice(0, 10) + ' ' + req.body.primaryDate.toString().slice(11, 19)

    let secondaryDate1 = null
    let secondaryDate2 = null
    let primaryDate = null

    let interviewId = req.body.interviewId
    let adminId = req.body.adminId

    if (req.body.primaryDate != '') {
        primaryDate = req.body.primaryDate.toString().slice(0, 10) + ' ' + req.body.primaryDate.toString().slice(11, 19) + ':00'
    } else {
        res.status(422).send({ error: "error:primary simulation should not be empty" });
        return
    }

    if (req.body.secondaryDate1 != '') {
        secondaryDate1 = req.body.secondaryDate1.toString().slice(0, 10) + ' ' + req.body.secondaryDate1.toString().slice(11, 19) + ':00'
    }
    if (req.body.secondaryDate2 != '') {
        secondaryDate2 = req.body.secondaryDate2.toString().slice(0, 10) + ' ' + req.body.secondaryDate2.toString().slice(11, 19) + ':00'
    }

    if (secondaryDate1 === null && secondaryDate2 != null) {
        let query = `INSERT INTO simulation(id,date1,date2,date3,InterviewId,adminId)
        VALUES(NULL,"${primaryDate}",null,"${secondaryDate2}",${interviewId},${adminId});`
        let result = await sequelize.query(query)
    } else if (secondaryDate1 != null && secondaryDate2 === null) {
        let query = `INSERT INTO simulation(id,date1,date2,date3,InterviewId,adminId)
        VALUES(NULL,"${primaryDate}","${secondaryDate1}",null,${interviewId},${adminId});`
        let result = await sequelize.query(query)
    } else if (secondaryDate1 != null && secondaryDate2 != null) {
        let query = `INSERT INTO simulation(id,date1,date2,date3,InterviewId,adminId)
        VALUES(NULL,"${primaryDate}","${secondaryDate1}","${secondaryDate2}",${interviewId},${adminId});`
        let result = await sequelize.query(query)
    } else {
        let query = `INSERT INTO simulation(id,date1,date2,date3,InterviewId,adminId)
        VALUES(NULL,"${primaryDate}",null,null,${interviewId},${adminId});`
        let result = await sequelize.query(query)
    }

    res.send("succeed")
})

router.get('/interviews', async function(req, res) {
    const cohort = req.query.cohort
    const interViewStatus = req.query.interViewStatus

    // let cohort = 'Atidna 1';
    // let interViewStatus = 'Passed';
    let user
    if (cohort === 'all' && interViewStatus === 'all') {
        user = await sequelize.query(`    
            select i.id , u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
        `)
    } else if (cohort === 'all') {
        user = await sequelize.query(`    
            select i.id ,u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where i.status = '${interViewStatus}'
        `)
    } else if (interViewStatus === 'all') {
        user = await sequelize.query(`    
            select i.id , u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' 
        `)
    } else {
        user = await sequelize.query(`    
            select i.id, u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' and i.status = '${interViewStatus}'
        `)
    }

    res.send(user[0])
})


router.get('/Statistics', async function(req, res) {
    // const cohort = req.query.cohort
    // const interViewStatus = req.query.interViewStatus
    let obj = {};

    if (req.query.cohort === 'all' && req.query.interViewStatus === 'all') {
        let InProcess = await sequelize.query(`    
        select p.UserId
        from candidate As c  inner join process As p 
            on c.id = p.UserId 
        where c.isEmployeed = 0 and ( p.status = 'In progress')
        GROUP BY p.UserId
        `)
        let inProcess = InProcess.length

        let student = await sequelize.query(`    
        select count(*) As NumberOfStudent
        from candidate 
        `)

        let employed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate 
        where candidate.isEmployeed = 1 
        `)

        let unEmployed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate 
        where candidate.isEmployeed = 0
        `)

        let NotActive = unEmployed[0][0].NumberOfemployed - inProcess
        obj = {
            student: student[0][0].NumberOfStudent,
            employed: employed[0][0].NumberOfemployed,
            unEmployed: unEmployed[0][0].NumberOfemployed,
            InProcess: inProcess,
            NotActive: NotActive
        }
    } else if (req.query.cohort === 'all') {
        let inProcess = await sequelize.query(` 
        select count(*) As NumberOfemployed
        from candidate AS c
        where  c.id In(
        select  p.UserId
        from candidate As c  inner join process As p 
        on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0  and i.status = '${req.query.interViewStatus}'
        GROUP BY p.UserId)
        `)


        let student = await sequelize.query(`    
        
 select count(*) As NumberOfStudent
 from  candidate
  where candidate.id In
      (select p.UserId 
      from candidate As c inner join process As p 
      on  c.id = p.UserId 
      inner join Interview As i on i.processId = p.id
      where i.status = '${req.query.interViewStatus}'
      GROUP BY p.UserId)

        `)

        let employed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate As c
        where c.id In (
        select  c.id
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 1 and i.status = '${req.query.interViewStatus}'
        GROUP BY  c.id)
        `)
        let unEmployed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate As c
        where c.id In (
        select  c.id
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and i.status = '${req.query.interViewStatus}'
        GROUP BY  c.id)
        `)

        let NotActive = unEmployed[0][0].NumberOfemployed - inProcess[0][0].NumberOfemployed
        obj = {
            student: student[0][0].NumberOfStudent,
            employed: employed[0][0].NumberOfemployed,
            unEmployed: unEmployed[0][0].NumberOfemployed,
            InProcess: inProcess[0][0].NumberOfemployed,
            NotActive: NotActive
        }
    } else if (req.query.interViewStatus === 'all') {
        let inProcess = await sequelize.query(` 
        select count(*) As NumberOfemployed
        from candidate AS c
        where  c.id In(
        select  p.UserId
        from candidate As c  inner join process As p 
        on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and c.cohort = '${req.query.cohort}' 
        GROUP BY p.UserId)
        `)

        let student = await sequelize.query(`   
        select count(*) As NumberOfStudent
        from candidate
        where candidate.id In
        (
        select p.UserId
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        where  c.cohort = '${req.query.cohort}'
        GROUP BY p.UserId)
        `)

        let employed = await sequelize.query(` 
        select count(*) As NumberOfemployed
        from candidate
        where candidate.id  In
        (select p.UserId
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        where c.isEmployeed = 1  and c.cohort = '${req.query.cohort}'
        GROUP BY p.UserId)
        `)
        let unEmployed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate
        where candidate.id  In
        (select p.UserId
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        where c.isEmployeed = 0  and c.cohort = '${req.query.cohort}'
        GROUP BY p.UserId)
        `)

        let NotActive = unEmployed[0][0].NumberOfemployed - inProcess[0][0].NumberOfemployed
        obj = {
            student: student[0][0].NumberOfStudent,
            employed: employed[0][0].NumberOfemployed,
            unEmployed: unEmployed[0][0].NumberOfemployed,
            InProcess: inProcess[0][0].NumberOfemployed,
            NotActive: NotActive
        }
    } else {
        let inProcess = await sequelize.query(`   
        select count(*) As NumberOfemployed
        from candidate AS c
        where  c.id In(
        select  p.UserId
        from candidate As c  inner join process As p 
        on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and c.cohort = '${req.query.cohort}' and i.status = '${req.query.interViewStatus}'
        GROUP BY p.UserId) 
    
        `)

        let student = await sequelize.query(`    
        
 select count(*) As NumberOfStudent
 from  candidate
  where candidate.id In
      (select p.UserId 
      from candidate As c inner join process As p 
      on  c.id = p.UserId 
      inner join Interview As i on i.processId = p.id
      where  c.cohort = '${req.query.cohort}' and i.status = '${req.query.interViewStatus}' 
      GROUP BY p.UserId)

        `)

        let employed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate As c 
        where c.id In(
        select p.UserId
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 1 and c.cohort = '${req.query.cohort}' and i.status = '${req.query.interViewStatus}'
        GROUP BY p.UserId)
        `)
        let unEmployed = await sequelize.query(`    
        select count(*) As NumberOfemployed
        from candidate As c 
        where c.id In(
        select p.UserId
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and c.cohort = '${req.query.cohort}' and i.status = '${req.query.interViewStatus}'
        GROUP BY p.UserId)
        `)

        let NotActive = unEmployed[0][0].NumberOfemployed - inProcess[0][0].NumberOfemployed
        obj = {
            student: student[0][0].NumberOfStudent,
            employed: employed[0][0].NumberOfemployed,
            unEmployed: unEmployed[0][0].NumberOfemployed,
            InProcess: inProcess[0][0].NumberOfemployed,
            NotActive: NotActive
        }
    }

    res.send(obj)


})

router.get('/cohort', async function(req, res) {
    let cohorts = `select * from cohort`
    let result = await sequelize.query(cohorts)
    res.send(result[0])
})

router.post('/cohort', async function(req, res) {
    console.log(req.body)
    let startDate = req.body.startDate.toString().slice(0, 10)
    let endDate = req.body.endDate.toString().slice(0, 10)
    let deadline = req.body.deadline.toString().slice(0, 10)

    let query = `INSERT INTO COHORT VALUES("${req.body.name}","${startDate}","${endDate}","${deadline}")`
    let result = await sequelize.query(query)
    res.send(true)
})

router.post('/admin', async function(req, res) {
    console.log(req.body)

    let query = `SELECT * FROM userproporties WHERE email="${req.body.email}";`
    let result = await sequelize.query(query)

    if (result[0].length > 0) {
        res.status(409).send({ error: "Email already Exist" })
        return;
    }
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 7;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    let addToUserProporties = `INSERT INTO userproporties 
    VALUES( NULL ,NULL,"${req.body.firstName}","${req.body.lastName}","${req.body.email}","${req.body.phone}","${password}" , true );`
    result = await sequelize.query(addToUserProporties)

    let addToAdmin = `INSERT INTO Admin VALUES(${result[0]},"${req.body.type}")`
    result = await sequelize.query(addToAdmin)
    res.send(true)
})
router.put('/profileDetails', async function(req, res) {

    if (req.body.name) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                firstName = "${req.body.name}"
              WHERE
                  id = "${req.body.adminId}"`)
    }

    if (req.body.lastName) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                lastName = "${req.body.lastName}"
              WHERE
                id = "${req.body.adminId}"`)
    }

    if (req.body.password) {
        await sequelize.query(`UPDATE userproporties 
              SET         
              password = "${req.body.password}"
              WHERE
                id = "${req.body.adminId}"`)
    }

    if (req.body.phone) {
        await sequelize.query(`UPDATE userproporties 
              SET         
                phone = ${req.body.phone}
              WHERE
                id = "${req.body.adminId}"`)
    }
    res.send("sucess")
})

module.exports = router;
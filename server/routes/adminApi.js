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

router.get('/AdminData', function (req, res) {
    res.send("lotem")
})
router.get('/qustions' ,async function (req, res) {

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

router.delete('/question', async function (req, res) {
    const questionDeleted = await sequelize.query(`
    DELETE FROM questions
    WHERE id = "${req.body.questionId}"
    `)
        res.send(questionDeleted[0])

})
router.put('/question', async function (req, res) {
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

router.put('/sulotion', async function (req, res) {
 
    const sulotion = await sequelize.query(`
    UPDATE questions 
    SET 
        solution = "${req.body.sulotion}"
    WHERE
        id = "${req.body.questionId}"
        `)
        res.send(sulotion[0])

})
router.post('/simulation', async function (req, res) {
    let primaryDate = req.body.primaryDate.toString().slice(0, 10) + ' ' + req.body.primaryDate.toString().slice(11, 19)

    let secondaryDate1 = null
    let secondaryDate2 = null

    if (primaryDate.length < 17) {
        primaryDate = primaryDate + ':00'
    }

    if (req.body.secondaryDate1 != '') {
        secondaryDate1 = req.body.secondaryDate1.toString().slice(0, 10) + ' ' + req.body.secondaryDate1.toString().slice(11, 19) + ':00'
    }
    if (req.body.secondaryDate2 != '') {
        secondaryDate2 = req.body.secondaryDate2.toString().slice(0, 10) + ' ' + req.body.secondaryDate2.toString().slice(11, 19) + ':00'
    }

    let interviewId = req.body.interviewId
    let adminId = req.body.adminId

    

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

    res.send("result")
})

router.get('/interviews', async function (req, res) {
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
    }
    else if (cohort === 'all') {
        user = await sequelize.query(`    
            select i.id ,u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where i.status = '${interViewStatus}'
        `)
    }
    else if (interViewStatus === 'all') {
        user = await sequelize.query(`    
            select i.id , u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' 
        `)
    }
    else {
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


router.get('/Statistics', async function (req, res) {
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
    }
    else if (req.query.cohort === 'all') {
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
    }
    else if (req.query.interViewStatus === 'all') {
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
    }
    else {
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

module.exports = router;

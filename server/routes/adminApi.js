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


router.get('/interviews', async function (req, res) {
    const cohort = req.query.cohort
    const interViewStatus = req.query.interViewStatus

    // let cohort = 'Atidna 1';
    // let interViewStatus = 'Passed';
    let user
    if (cohort === 'all' && interViewStatus === 'all') {
        user = await sequelize.query(`    
            select u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
        `)
    }
    else if (cohort === 'all') {
        user = await sequelize.query(`    
            select u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where i.status = '${interViewStatus}'
        `)
    }
    else if (interViewStatus === 'all') {
        user = await sequelize.query(`    
            select u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' 
        `)
    }
    else {
        user = await sequelize.query(`    
            select u.firstName , u.lastName ,u.email, c.cohort , p.companyName  , p.jobTitle, i.type , i.date , i.status            from UserProporties As u inner join candidate As c 
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

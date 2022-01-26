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

router.get('/AdminData', function(req, res) {
    res.send("lotem")
})


router.get('/interviews',async function(req, res) {
    const cohort = req.query.cohort
    const interViewStatus = req.query.interViewStatus

    // let cohort = 'Atidna 1';
    // let interViewStatus = 'Passed';
    let user
    if(cohort === 'all' && interViewStatus === 'all'){
        user = await sequelize.query(`    
            select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
        `)
    }
    else if(cohort === 'all' ){
        user = await sequelize.query(`    
            select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where i.status = '${interViewStatus}'
        `)
    }
    else if(interViewStatus === 'all'){
        user = await sequelize.query(`    
            select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' 
        `)
    }
    else{
        user = await sequelize.query(`    
            select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where c.cohort = '${cohort}' and i.status = '${interViewStatus}'
        `)
    }
    
    res.send(user[0])
})


router.get('/Statistics',async function(req, res) {
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

    
    let InProcess  = await sequelize.query(`    
    select p.UserId 
    from candidate As c  inner join process As p 
        on c.id = p.UserId inner join interview As i
        on p.id = i.processId 
    where i.processId Not In
    (
    select i.processId
    from candidate As c  inner join process As p 
        on c.id = p.UserId inner join interview As i
        on p.id = i.processId 
    where c.isEmployeed = 0 and ( i.status = 'Pending' or i.status ='Failed' or i.status = 'No Reply')
    GROUP BY i.processId
    )
    GROUP BY p.UserId
    `)
    let inProcess = Object.keys(InProcess[0]).length
    // let noActive
    let NotActive = unEmployed[0][0].NumberOfemployed - inProcess
    const obj = {
        student : student[0][0].NumberOfStudent,
        employed : employed[0][0].NumberOfemployed , 
        unEmployed : unEmployed[0][0].NumberOfemployed ,
        InProcess : inProcess ,
        NotActive : NotActive
    }
    res.send(obj)

})


module.exports = router;



const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize');
const { isConstructorDeclaration } = require('typescript');
const sequelize = new Sequelize('mysql://root:@localhost/jobManagerDB')

router.post('/', async(req, res) => {
    console.log(req.body.values.firstName)
    let firstName = req.body.values.firstName;
    let lastName = req.body.values.lastName
    let email = req.body.values.email
    let phone = req.body.values.phone
    let password = req.body.values.password
    let cohort = req.body.values.cohort

    if (await emailNotExist(email)) {
        let id = await addToUserProportiesTable(firstName, lastName, email, phone, password)
        await addToCandidateTable(id, cohort)
    }

})

async function emailNotExist(email) {
    let query = `SELECT * FROM userproporties WHERE email="${email}";`
    let result = await sequelize.query(query)
    console.log("emailNotExist")
    console.log(result)
    return result[0].length === 0
}

async function addToUserProportiesTable(firstName, lastName, email, phone, password) {
    let query = `INSERT INTO userproporties VALUES(NULL,NULL,"${firstName}","${lastName}","${email}","${phone}","${password}",0);`
    let result = await sequelize.query(query)
    console.log("addToUserProportiesTable")
    console.log(result)
    return result[0]
}

async function addToCandidateTable(id, cohort) {
    let query = `INSERT INTO Candidate VALUES(${id},'Student',false,'${cohort}',NULL);`
    let result = await sequelize.query(query)
    console.log("addToCandidateTable")
    console.log(result)
}
module.exports = router;
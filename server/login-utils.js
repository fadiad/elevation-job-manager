const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/jobmanagerdb')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
let user = {}

async function getUserProporties(email) {
    let result = await sequelize
        .query(`SELECT * 
                FROM UserProporties AS u 
                WHERE u.email="${email}";`)
    user = result[0][0]
    return result[0][0]
}

function isLoggedIn(session) {
    return isEmailExist(session) && user.session_id === session.id
}

function isAdmin(session) {
    return session && user.isAdmin
}

function isStudent(session) {
    return session && !user.isAdmin
}

function isEmailExist(session) {
    return session && user != undefined
}

async function isVerified(email, userPassword) {
    await getUserProporties(email)
    return user != undefined && user.password == userPassword
}

function isAdminLoggedIn(session) {
    return isLoggedIn(session) && isAdmin(session)
}

function isStudentLoggedIn(session) {
    return isLoggedIn(session) && isStudent(session)
}

async function storeUserInSession(session, email) {
    session.email = email;
    user.session_id = session.id
    let result = await sequelize
        .query(`UPDATE UserProporties
                SET session_id = "${session.id}"        
                WHERE email="${email}";`)
}

async function destroySession() {
    await sequelize
        .query(`UPDATE UserProporties
            SET session_id = "NULL";`)
    user = {}
}

async function getUserData(session) {
    if (session.email) {
        return await getUserProporties(session.email)
    }
    return { msg: "session Not Found" }
}

module.exports = { isVerified, isLoggedIn, storeUserInSession, getUserData, isStudent, isAdmin, destroySession, isStudentLoggedIn, isAdminLoggedIn }
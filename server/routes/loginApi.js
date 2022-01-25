const express = require('express')
const router = express.Router()
const login = require('../login-utils');

router.post('/', async(req, res) => {

    let session = req.session;
    let email = req.body.email
    let password = req.body.password

    if (await login.isVerified(email, password)) {
        await login.storeUserInSession(session, email)
        if (login.isLoggedIn(session)) {
            if (login.isAdmin(session)) {
                res.send(await login.getUserData(session))
            } else if (login.isStudent(session)) {
                res.send(await login.getUserData(session))
            }
        } else {
            res.send("Please Login")
        }
    } else {
        res.send('Invalid email or password');
    }
})

module.exports = router;
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
                // req.session.cookie.expires = false;
                req.session.save()
                    // return res.redirect('/adminPage');
                console.log("entered /login")
                console.log(req.session)

                res.send({ isAdmin: true })
            } else if (login.isStudent(session)) {
                 login.getUserId(session)
                .then(function(data ) {
                    res.send({ isAdmin: false , id: data })
                })
            }
        } else {
            res.send("Please Login")
        }
    } else {
        res.send('Invalid email or password');
    }
})

module.exports = router;
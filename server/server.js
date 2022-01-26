const express = require('express')
const loginApi = require('./routes/loginApi')
const studentapi = require('./routes/studentApi')
const adminApi = require('./routes/adminApi')
const login = require('./login-utils');
const session = require('express-session');

const app = express()

app.use(express.json())
    // app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: "elevation" }))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.use('/login', loginApi)

// app.use('/studentPage', (req, res, next) => {
//     if (login.isStudentLoggedIn(req.session)) {
//     next();
//     } else {
//     res.send('you are not a Student - you dont have a permission')
//     }
// })
app.use('/studentPage', studentapi)

// app.use('/adminPage', (req, res, next) => {
//     if (login.isAdminLoggedIn(req.session)) {
//         next();
//     } else {
//         res.send('you are not an Admin - you dont have a permission')
//     }
// })

app.use('/adminPage', adminApi)

app.get('/logout', async(req, res) => {
    req.session.destroy()
    await login.destroySession();
    res.send("logged out")
})
const port = 8888

app.listen(process.env.PORT || port, function() {
    console.log(`Running on port ${port}`)
})
const express = require('express')
const loginApi = require('./routes/loginApi')
const studentapi = require('./routes/studentApi')
const adminApi = require('./routes/adminApi')
const login = require('./login-utils');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: crypto.randomBytes(16).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'no-cors,Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.use('/login', loginApi)

app.use('/studentPage', (req, res, next) => {
    // if (login.isStudentLoggedIn(req.session)) {
    console.log("--------------")
    console.log(req.body)
    next();
    // } else {
    //     res.send('you are not a Student - you dont have a permission')
    // }

})
app.use('/studentPage', studentapi)

app.use('/adminPage', async(req, res, next) => {
    console.log("Entered /adminPage")
    console.log(req.session)
        // await login.getUserData(req.session)
        // if (login.isAdminLoggedIn(req.session)) {
    next();
    // } else {
    //     res.send('you are not an Admin - you dont have a permission')
    // }
})

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
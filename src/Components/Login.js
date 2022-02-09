
import axios from 'axios';
import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Typography, ThemeProvider } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import theme from './theme';
import cookie from 'react-cookies'

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const paperStyle = { padding: 50, height: '50vh', width: 280, margin: "50px auto" }
    const logoStyle = { display: "flex", width: "40px" }
    const btnstyle = { margin: '8px 0' }

    const login = () => {
        axios.post("http://localhost:8888/login", {
            email: email,
            password: password
        })
            .then((response) => {
                cookie.save('userID', response.data.id)
                
                if (response.data.isAdmin) {
                    cookie.save('role', "admin")
                    props.setUser(response.data.id, "admin");
                } else if (response.data.isAdmin === false) {
                    cookie.save('role', "student")
                    props.setUser(response.data.id, "student");
                } else {
                    <Redirect to='/' />
                }
            })
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <img src="elevation.png" style={logoStyle} />
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email' fullWidth required onChange={handleEmail} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handlePassword} />
                <ThemeProvider theme={theme}>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={login}>Sign in</Button>
                </ThemeProvider>
                <Typography > Do you have an account ?

                    <Link to="/signup" style={{ color: '#658ec6', "text-decoration": "none" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

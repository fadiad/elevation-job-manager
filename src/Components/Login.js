
import axios from 'axios';
import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Typography, ThemeProvider } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import theme from './theme';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const paperStyle = { padding:50 , height: '50vh', width: 280, margin: "50px auto" }
    const logoStyle = { display: "flex", width: "40px" }
    const btnstyle = { margin: '8px 0' }

    const login = () => {
        axios.post("http://localhost:8888/login", {
            email: email,
            password: password
        })
            .then((response) => {
                props.setUserId(response.data.id);
                if (response.data.isAdmin) {
                    props.setRole("admin");
                    <Redirect to='/adminPage' />
                } else if (response.data.isAdmin === false) {
                    props.setRole("student");
                    <Redirect to='/studentPage' />
                }else{
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
                    
                    <Link to="/signup" style={{color:'#658ec6',"text-decoration":"none"}}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

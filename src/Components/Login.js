// import axios from 'axios';
// import { Redirect } from "react-router-dom";
// import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react'

// class Login extends Component {
//     constructor() {
//         super();
//         this.state = {
//             email: "",
//             password: ""
//         }
//     }
//     handleEmail = (event) => this.setState({ email: event.target.value })
//     handlePassword = (event) => this.setState({ password: event.target.value })
//     
//     render() {
//         return (
//             <div>
//                 <label>Email:</label> <input type='text' placeholder="email" value={this.state.email} onChange={this.handleEmail} />
//                 <label>password:</label> <input type='text' placeholder="password" value={this.state.password} onChange={this.handlePassword} />
//                 <button onClick={this.login}>Login</button>

//             </div>
//         );
//     }
// }

// export default inject("userStore")(observer(Login))
import axios from 'axios';
import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
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
                <TextField label='email' placeholder='Enter email' fullWidth required onChange={handleEmail} />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handlePassword} />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={login}>Sign in</Button>
                <Typography >
                    {/* <Link href="#" >
                        Forgot password ?
                </Link> */}
                </Typography>
                <Typography > Do you have an account ?
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login

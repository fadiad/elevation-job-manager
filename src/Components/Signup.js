import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button ,ThemeProvider} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import theme from './theme';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import '../styles/signUp.css';
const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "50px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#ff96aa' }

    const cohorts=[{value:"Atidna 1",label:"Atidna 1"},{value:"Atidna 2",label:"Atidna 2"},{value:"Atidna 3",label:"Atidna 3"},{value:"Atidna 4",label:"Atidna 4"}]
    
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        cohort:'Atidna 4'
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
   
    const signUp = () => {
        axios.post("http://localhost:8888/signup", {values})
            .then((response) => {
                console.log(response);
                <Redirect to='/' />
            })
    }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                </Grid>
                <form>
                    <div>
                    <TextField required fullWidth label='First Name' placeholder="Enter your First Name" value={values.firstName} onChange={handleChange('firstName')} />
                    <TextField required fullWidth label='Last Name' placeholder="Enter your Last Name" value={values.lastName} onChange={handleChange('lastName')} />
                    <TextField required fullWidth label='Email' type="email" placeholder="Enter your email" value={values.email} onChange={handleChange('email')} />
                    <TextField required fullWidth label='Phone Number' placeholder="Enter your phone number" value={values.phone} onChange={handleChange('phone')} />
                    <TextField required fullWidth label='Password' placeholder="Enter your password" value={values.password} type="password" onChange={handleChange('password')} />
                    <TextField id="standard-select-cohort" select label="Select" value={values.cohort} onChange={handleChange('cohort')} helperText="Please select your cohort" variant="standard">
                        {cohorts.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    </div>
                    <ThemeProvider theme={theme}>
                        <Button type='submit' variant='contained' color='primary' onClick={signUp}>Sign up</Button>
                    </ThemeProvider>
                    </form>
                   
            </Paper>
        </Grid>
    )
}

export default Signup;
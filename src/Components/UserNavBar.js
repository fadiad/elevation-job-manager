import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import WorkIcon from '@mui/icons-material/Work';

import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import '../styles/navBar.css';
import theme from './theme';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'


class NavBar extends Component {
    logout = () => {
        console.log("entered logout")
        axios.get("http://localhost:8888/logout", function (res) {
            console.log(res);
            <Redirect to="/" />
        })
        cookie.remove('userID', { path: '/' })
        cookie.remove('role', { path: '/' })
    }
    render() {
        return (
            <div class="navBar-Container">
                <img width="45" height="45" src="elevation.png" alt="" />
                <img width="120" style={{padding: 15+"px"}} src="elevation_logo.png" alt="" />
                <Stack className='nav-Buttons' spacing={4} direction="row">
                    <ThemeProvider theme={theme}>
                        <Link to="/studentPage">
                            <IconButton className='icon' aria-label="home" color='secondary' size="large">
                                <span className='tooltiptext'>Home</span>
                                <HomeIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                        <Link to="/studentPage/displayJobs">
                            <IconButton className='icon' aria-label='jobs' color='secondary' size="large">
                                <span className='tooltiptext'>Jobs</span>
                                <WorkIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/studentPage/profile">
                            <IconButton className='icon' aria-label='Profile' color='secondary' size="large">
                                <span className='tooltiptext'>Profile</span>
                                <AccountCircleSharpIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/">
                            <IconButton className='icon' aria-label='Logout' color='secondary' size="large" onClick={this.logout}>
                                <span className='tooltiptext'>Logout</span>
                                <ExitToAppSharpIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                    </ThemeProvider>
                </Stack>
            </div>
        );
    }
}
export default NavBar;
import React, { Component } from 'react';
import axios from 'axios';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import '../styles/navBar.css';
import theme from './theme';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    logout = () => {
        console.log("entered logout")
        axios.get("http://localhost:8888/logout", function (res) {
            console.log(res);
            <Redirect to="/" />
        })
    }
    render() {
        return (
            <div class="navBar-Container">
                <img width="45" height="45" src="elevation.png" alt="" />
                <img width="120" style={{padding: 15+"px"}} src="elevation_logo.png" alt="" />
                <Stack className='nav-Buttons' spacing={4} direction="row">
                    <ThemeProvider theme={theme}>
                        <Link to="/adminPage">
                            <IconButton className='icon' aria-label="home" color='secondary' size="large">
                                <span className='tooltiptext'>Home</span>
                                <HomeIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/qustion">
                            <IconButton className='icon' aria-label='questions' color='secondary' size="large">
                                <span className='tooltiptext'>Questions</span>
                                <QuizIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/displayJobs">
                            <IconButton className='icon' aria-label='jobs' color='primary' size="large">
                                <span className='tooltiptext'>Jobs</span>
                                <WorkIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/Settings">
                            <IconButton className='icon' aria-label='Settings' color='secondary' size="large">
                                <span className='tooltiptext'>Settings</span>
                                <SettingsIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        
                        <Link to="/profile">
                            <IconButton className='icon' aria-label='Profile' color='secondary' size="large">
                                <span className='tooltiptext'>Profile</span>
                                <AccountCircleSharpIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/">
                            <IconButton className='icon' aria-label='Logout' color='secondary' size="large">
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
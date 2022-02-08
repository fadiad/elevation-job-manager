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
import cookie from 'react-cookies';

class AdminNavBar extends Component {
    constructor() {
        super()
        this.state = {

            home: "primary",
            questions: "secondary",
            jobs : "secondary" ,
            settings : "secondary" ,
            profile : "secondary"
        }
    }
    setColorIconHome = async () => {
        await this.setState({
            home: "primary",
            questions: "secondary",
            jobs : "secondary" ,
            settings : "secondary" ,
            profile : "secondary"
        })
    }
     setColorIconQuestions = async () => {
        await this.setState({
            home: "secondary",
            questions:  "primary" ,
            jobs : "secondary" ,
            settings : "secondary" ,
            profile : "secondary"
        })
    }
    setColorIconJobs = () => {
        this.setState({
            home: "secondary",
            questions:  "secondary" ,
            jobs : "primary" ,
            settings : "secondary" ,
            profile : "secondary"
        })
    }
    setColorIconProfile = () => {
        this.setState({
            home: "secondary",
            questions:  "secondary" ,
            jobs : "secondary" ,
            settings : "secondary" ,
            profile : "primary"
        })
    }
    setColorIconSettings = () => {
        this.setState({
            home: "secondary",
            questions:  "secondary" ,
            jobs : "secondary" ,
            settings : "primary" ,
            profile : "secondary"
        })
    }
    logout = () => {
        console.log("entered logout")
        axios.get("http://localhost:8888/logout", function (res) {
            <Redirect to="/" />
        })
        cookie.remove('userID', { path: '/' })
        cookie.remove('role', { path: '/' })

    }
    render() {
        return (
            <div class="navBar-Container">
                <img width="45" height="45" src="elevation.png" alt="" />
                <img width="120" style={{padding: 15+"px"}} src="/elevation_logo.png" alt="" />
                <Stack className='nav-Buttons' spacing={4} direction="row">
                    <ThemeProvider theme={theme}>
                        <Link exact to="/adminPage">
                            <IconButton  onClick={this.setColorIconHome} className='icon' aria-label="home" color={this.state.home} size="large">
                                <span className='tooltiptext'>Home</span>
                                <HomeIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/question" >
                            <IconButton onClick={this.setColorIconQuestions} className='icon' aria-label='questions' color={this.state.questions} size="large">
                                <span className='tooltiptext'>Questions</span>
                                <QuizIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/jobs"  onClick={this.setColorIconJobs}>
                            <IconButton className='icon' aria-label='jobs' color={this.state.jobs} size="large">
                                <span className='tooltiptext'>Jobs</span>
                                <WorkIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        <Link to="/adminPage/Settings" onClick={this.setColorIconSettings}>
                            <IconButton className='icon' aria-label='Settings' color={this.state.settings} size="large">
                                <span className='tooltiptext'>Settings</span>
                                <SettingsIcon fontSize='inherit' />
                            </IconButton>
                        </Link>
                        
                        <Link to="/adminPage/profile">
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
export default AdminNavBar;
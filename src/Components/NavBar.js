import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Stack from '@mui/material/Stack';
import {ThemeProvider} from '@mui/material/styles';
import '../styles/navBar.css';
import theme from './theme';
import { Redirect } from 'react-router-dom';
class NavBar extends Component {
    logout = () => {
        console.log("entered logout")
        axios.get("http://localhost:8888/logout",function(res){
            console.log(res);
            <Redirect to="/" />
        })
    }
    render(){
        return(
            <div class="navBar-Container">
               <img width="70" height="70" src="elevation.png" alt="" />
                <h2>Elevation</h2>
                <Stack className='nav-Buttons' spacing={2} direction="row">
                    <ThemeProvider theme={theme}>
                        <Button color="primary" variant="outlined" startIcon={<AccountCircleSharpIcon />}>Profile</Button>
                        <Button variant="outlined" startIcon={<ExitToAppSharpIcon />} onClick={this.logout}>Logout</Button>
                    </ThemeProvider>
                </Stack>
            </div>
        );
    }
}
export default NavBar;
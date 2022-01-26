import React, { Component } from 'react';
import axios from 'axios';

import '../styles/navBar.css';

class NavBar extends Component {
    logout = () => {
        // axios.get("http://localhost:8888/logout",function(req,res){
        //     console.log(res)
        // })
    }
    render(){
        return(
            <div class="navBar-Container">
                <img width="100" height="80" src="elevation.png" class="attachment-full size-full" alt="" />
                <h2>Elevation</h2>
                <div class="logoButtons">
                    <button>Profile</button>
                    <button onClick={this.logout}>Logout</button>
                </div> 
            </div>
        );
    }
}
export default NavBar;
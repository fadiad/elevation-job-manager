import React, { Component } from 'react';
import '../styles/navBar.css';

class NavBar extends Component {
    render(){
        return(
            <div class="navBar-Container">
                <img width="100" height="80" src="elevation.png" class="attachment-full size-full" alt="" />
                <h2>Elevation</h2>
                <div class="logoButtons">
                    <button>Profile</button>
                    <button>Logout</button>
                </div> 
            </div>
        );
    }
}
export default NavBar;
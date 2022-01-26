import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';
import '../../'
class User extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <AddProcess/>
                {/* <button>add process</button> */}
                <br />
                <br />
                <br />
                <br />
                <Processes />
            </div>
        );
    }
}

export default inject("userStore")(observer(User))



import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';
import '../../'
class User extends Component {

    componentDidMount() {
        this.props.userStore.getProcesses(this.props.userStore.userID)
    }

    render() {
        return (
            <div>
                <NavBar />
                <AddProcess/>
                <br />
                <br />
                <Processes processes = {this.props.userStore.processes}/>
            </div>
        );
    }
}

export default inject("userStore")(observer(User))



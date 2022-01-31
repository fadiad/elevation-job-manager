import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';

import '../../styles/User.css'


class User extends Component {
    constructor() {
        super()
        this.state = {
            openDialog: false
        }
    }

    componentDidMount = () => {
        this.props.userStore.getProcesses(this.props.userStore.userID)
        this.props.userStore.getUserData(this.props.userStore.userID)
    }

    setOpenDialog = () => {
        this.setState({
            openDialog: true
        })
    }
    setCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.userStore.userID}</h1>
                <NavBar />
                <button
                    text="Add new Process"
                    onClick={this.setOpenDialog}
                >add Process
                </button>
                <AddProcess
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    setCloseDialog={this.setCloseDialog}
                />
                <br />
                {
                    this.props.userStore.userData.isEmployeed === 1 ?
                        <div className='Start-Working'> Start working </div>
                        : null
                }
                <br />
                <Processes processes={this.props.userStore.processes} userId={this.props.userStore.userID} />
            </div>
        );
    }
}
export default inject("userStore")(observer(User))

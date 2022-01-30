import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';
import '../../styles/User.css'


class User extends Component {

    componentDidMount = () => {
        this.props.userStore.getUserData(this.props.userStore.userID)
        this.props.userStore.getProcesses(this.props.userStore.userID)
    }
    render() {
        // console.log(this.props.userStore.userData);

    
// console.log(this.props.userStore.userID);
        return (
            <div>
                <NavBar />
                <AddProcess/>

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



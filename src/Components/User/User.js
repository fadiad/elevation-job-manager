import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';
class User extends Component {

    componentDidMount = () => {
        this.props.userStore.getUserData(this.props.userStore.userID)
        this.props.userStore.getProcesses(this.props.userStore.userID)
    }
    render() {
        // console.log(this.props.userStore.userData);

    
console.log(this.props.userStore.userID);
        return (
            <div>
                <NavBar />
                <AddProcess/>

                <br />
                <br />
                <Processes processes = {this.props.userStore.processes} userId={this.props.userStore.userID}/>
            </div>
        );
    }
}

export default inject("userStore")(observer(User))



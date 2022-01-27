import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './usersInterviews';
import Statistics from './Statistics'
import NavBar from '../NavBar';
class Admin extends Component {
    componentDidMount() {
        this.props.adminStore.getAdminData()
    }
    render() {
        return (
            <div>
                <NavBar/>
                adminName : {this.props.adminStore.adminName}
                <Statistics />
                <UsersInterviews />
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
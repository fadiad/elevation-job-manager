import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import Statistics from './Statistics'
class Admin extends Component {
    componentDidMount() {
        this.props.adminStore.getAdminData()
    }
    render() {
        return (
            <div>
                adminName : {this.props.adminStore.adminName}
                <Statistics />
                <UsersInterviews />
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavBar from '../AdminNavBar';
import CreateJobAndSendToUser from './CreateJobAndSendToUser';
import '../../../styles/Admin.css';
// import '../../theme';
import Users from './Users';
class Jobs extends Component {

    render() {
        return (
            <div >
                <NavBar />
                <div className='page' >
                    <h1>New Job</h1>
                    <CreateJobAndSendToUser />
                </div>
            </div>
        );
    }
}
export default inject("adminStore")(observer(Jobs))
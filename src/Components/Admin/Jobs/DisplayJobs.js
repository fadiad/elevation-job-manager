/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavBar from '../../AdminNavBar';
// import '../../../styles/Admin.css'
// import '../../theme';
import usersData from './usersData'
class DisplayJobs extends Component {

    render() {
        return (
            <div className='Filter'>
                <NavBar />
                <usersData></usersData>
            </div>
        );
    }
}
export default inject("adminStore")(observer(DisplayJobs))
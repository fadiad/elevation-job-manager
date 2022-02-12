import React, { Component } from 'react';
import NavBar from '../AdminNavBar';
import ChooseNotifications from './ChooseNotifications';
import AddCohort from './AddCohort';
import AddAdmin from './AddAdmin';

class Settings extends Component {
    render(){
        return(
            <div>
                <NavBar />
                <div className='page'>
                    <h1>Settings</h1>
                <ChooseNotifications />
                <AddCohort />
                <AddAdmin />
                </div>
            </div>
        );
    }
}
export default Settings;
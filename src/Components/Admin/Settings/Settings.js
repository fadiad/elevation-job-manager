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
                <ChooseNotifications />
                <AddCohort />
                <AddAdmin />
            </div>
        );
    }
}
export default Settings;
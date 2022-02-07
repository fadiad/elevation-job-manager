import React, { Component } from 'react';
import NavBar from '../../AdminNavBar';
import ChooseNotifications from './ChooseNotifications';
import AddCohort from './AddCohort';

class Settings extends Component {
    render(){
        return(
            <div>
                <NavBar />
                <ChooseNotifications />
                <AddCohort />
            </div>
        );
    }
}
export default Settings;
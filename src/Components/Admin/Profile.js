import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ChooseNotifications from './ChooseNotifications'


export class Profile extends Component {

    render() {
        return (
            <div>
                <ChooseNotifications />

            </div>
        );
    }
}

export default Profile;

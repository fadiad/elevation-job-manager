import React, { Component } from 'react';
import '../../../styles/fileCard.css'

export class PasswordField extends Component {
    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Password</h3> </div>
                <div> <h5>Change Password </h5></div>
            </div>
        );
    }
}

export default PasswordField;

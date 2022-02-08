import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';

import '../../../styles/fileCard.css'


export class PhoneField extends Component {
    // static propTypes = {};
    changePoneNumber() {
        console.log("hi");
    }

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Phone Number</h3> </div>
                <div > <h5>{this.props.phone} </h5></div>
                {/* <EditIcon onClick={this.changePoneNumber} className='EditIcon' /> */}
            </div>
        );
    }
}

export default PhoneField;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export class EmailField extends Component {
    static propTypes = {};

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Email Adress</h3> </div>
                <div> <h5>{this.props.email}</h5></div>
                {/* <EditIcon className='EditIcon'/> */}
            </div>
        );
    }
}

export default EmailField;

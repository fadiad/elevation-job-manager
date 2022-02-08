import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import EditIcon from '@mui/icons-material/Edit';


export class AdminType extends Component {

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Admin Type</h3> </div>
                <div> <h5>{this.props.type}</h5></div>
            </div>
        );
    }
}

export default AdminType;

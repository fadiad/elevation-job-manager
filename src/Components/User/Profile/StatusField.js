import React, { Component } from 'react';

export class StatusField extends Component {

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Status</h3> </div>
                <div > <h5>{this.props.status} </h5></div>
            </div>
        );
    }
}

export default StatusField;

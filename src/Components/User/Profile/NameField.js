import React, { Component } from 'react';
import '../../../styles/fileCard.css'

export class NameField extends Component {

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Full Name</h3> </div>
                <div> <h5>{this.props.firstName}  {this.props.lastName}</h5></div>
            </div>
        );
    }
}

export default NameField;

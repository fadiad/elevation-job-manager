import React, { Component } from 'react';


export class EmailField extends Component {
    static propTypes = {};

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Email Adress</h3> </div>
                <div> <h5>{this.props.email}</h5></div>
            </div>
        );
    }
}

export default EmailField;

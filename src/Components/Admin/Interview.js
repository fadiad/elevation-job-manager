
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class Interview extends Component {
    
    render() {

        return (
            <div>
                <span>{this.props.interview.firstName} </span>
                <span>{this.props.interview.lastName} </span>
                <span>{this.props.interview.cohort} </span>
                <span>{this.props.interview.companyName} </span>
                <span>{this.props.interview.type} </span>
                <span>{this.props.interview.date} </span>
                <span>{this.props.interview.status}</span>
            </div>
        );
    }
}
export default inject("adminStore")(observer(Interview))
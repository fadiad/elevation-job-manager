import React, { Component } from 'react';

import '../../styles/interview.css'


class Interview extends Component {
    render() {
        return (
            <div className='interview'>
                <div>{this.props.interview.type}</div>
                <div>{this.props.interview.interviewerName}</div>
                <div>{this.props.interview.date}</div>
                {/* <div>{this.props.interview.processId}</div> */}
                {/* <div>{this.props.interview.simulationDate}</div> */}
                {/* <div>{this.props.interview.status}</div> */}
            </div>
        );
    }
}
export default Interview;
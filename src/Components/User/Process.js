import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';

class Process extends Component {
    render() {
        return (
            <div className='Process'>
                {this.props.process.companyName}
                {this.props.process.jobTitle}
                {this.props.process.Location}
                {this.props.process.foundBy}
                <Interviews interviews={this.props.process.interviews} />
            </div>
        );
    }
}
// export default Process;
export default inject("userStore")(observer(Process))

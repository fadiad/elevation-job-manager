import React, { Component } from 'react';
import Interview from './Interview';
import '../../styles/interviews.css'
import '../../styles/User.css'
class Interviews extends Component {
    render() {
        return (
            <div className='page'>
            <div>{this.props.interviews !== undefined && this.props.interviews.length > 0 ?
            
                <div className='interviews-titles'>
                    <div>Type</div>
                    <div>Interviewer</div>
                    <div>Date</div>
                    <div>Simualtion Date</div>
                    <div>Questions</div>
                    <div>Status</div>
                </div> : null }
                {this.props.interviews.map((i, index) => <Interview  setProcessUnActive={this.props.setProcessUnActive}  interview={i} key={index} />)}
                </div>
                </div>
        );
    }
}
export default Interviews;
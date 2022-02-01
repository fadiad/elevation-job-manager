import React, { Component } from 'react';
import Interview from './Interview';
import '../../styles/interviews.css'

class Interviews extends Component {
    render() {
        return (
            <div>{this.props.interviews !== undefined && this.props.interviews.length > 0 ?
            
                <div className='interviews-titles'>
                    <div>Type</div>
                    <div>interviewer Name</div>
                    <div>Date</div>
                    <div>Simualtion Date</div>
                    <div>Status</div>
                </div> : null }
                {this.props.interviews.map((i, index) => <Interview  setProcessUnActive={this.props.setProcessUnActive}  interview={i} key={index} />)}
                </div>
        );
    }
}
export default Interviews;
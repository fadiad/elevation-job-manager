import React, { Component } from 'react';
import Interview from './Interview';
import '../../styles/interviews.css'

class Interviews extends Component {
    render() {
        return (
            <div>
                <div className='interviews-titles'>
                    <div>Type</div>
                    <div>interviewer name</div>
                    <div>Date</div>
                </div>
                {this.props.interviews.map((i, index) => <Interview interview={i} key={index} />)}
            </div>
        );
    }
}
export default Interviews;
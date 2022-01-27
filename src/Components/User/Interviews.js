import React, { Component } from 'react';
import Interview from './Interview';


class Interviews extends Component {
    render() {
        return (
            <div>
                {this.props.interviews.map((i, index) => <Interview interview={i} key={index} />)}
            </div>
        );
    }
}
export default Interviews;
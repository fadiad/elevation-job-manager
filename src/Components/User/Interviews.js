import React, { Component } from 'react';
import Interview from './Interview';


class Interviews extends Component {
    render() {
        return (
            <div>
                interviews
                <button>add interView</button>
                <button>accepted</button>
                {this.props.interviews.map((i, index) => <Interview interview={i} key={index} />)}
            </div>
        );
    }
}
export default Interviews;
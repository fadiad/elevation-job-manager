import React, { Component } from 'react';
class Interviews extends Component {

    render() {
        return (
            <div>
                interviews 
                <button>add interView</button>
                <button>accepted</button>
                {/* {this.props.userStore.interviews.map((i, index) => <Interview interview={i} key={index} />)} */}
            </div>
        );
    }
}
export default Interviews;
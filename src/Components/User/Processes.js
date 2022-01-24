import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Process from './Process'

class Processes extends Component {
    componentDidMount() {
        this.props.userStore.getprocesses()
    }
    render() {
        return (
            <div className='Processes' >
                {this.props.userStore.processes.map((p, index) => <Process process={p} key={index} />)}
            </div>
        );
    }
}

export default inject("userStore")(observer(Processes))


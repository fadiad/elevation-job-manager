import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Process from './Process'

import '../../styles/processes.css'


class Processes extends Component {

    render() {
        return (
            <div className='processes' >
                {this.props.processes.map((p, index) => {
                    return (
                        <Process process={p} key={index} />
                    )
                })
                }
            </div>
        );
    }
}

export default inject("userStore")(observer(Processes))


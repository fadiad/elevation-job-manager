import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';

import '../../styles/process.css'

class Process extends Component {
    render() {
        return (
            <div className='Process'>

                <div class="mdc-card">
                    <div>
                        {this.props.process.companyName}
                    </div>
                    <div>
                        {this.props.process.jobTitle}
                    </div>
                    <div>
                        {this.props.process.location}
                    </div>
                    <div>
                        {this.props.process.foundBy}
                    </div>
                </div>
                
                <div className='interviews'>
                    <div><h2>Interviews</h2></div>
                    <div><button>add interView</button></div>
                    <div><button>accepted</button></div>
                </div>

                <Interviews interviews={this.props.process.interviews} />

            </div>
        );
    }
}
// export default Process;
export default inject("userStore")(observer(Process))

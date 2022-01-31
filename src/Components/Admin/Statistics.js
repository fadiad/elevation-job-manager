
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class Statistics extends Component {
    componentDidMount() {
        this.props.adminStore.getStatistics()
    }
    render() {
        console.log(this.props.adminStore.Statistics);

        return (
            <div>
                <span>Statistics : </span>
                <br />
                <span>student {this.props.adminStore.Statistics.student }</span>
                <br />
                <span>employed {this.props.adminStore.Statistics.employed }</span>
                <br />
                <span>unEmployed {this.props.adminStore.Statistics.unEmployed }</span>
                <br />
                <span>InProcess {this.props.adminStore.Statistics.InProcess }</span>
                <br/>
                <span>NotActive {this.props.adminStore.Statistics.NotActive }</span>              
            </div>
        );
    }
}
export default inject("adminStore")(observer(Statistics))
import React, { Component } from 'react';
import '../../styles/interview.css'
import { observer, inject } from 'mobx-react'


class Interview extends Component {
    pass= () => {
        this.props.userStore.changeStatus(this.props.interview.id,this.props.interview.processId,"Passed")
    }

    fail = () =>{
        this.props.userStore.changeStatus(this.props.interview.id,this.props.interview.processId,"Failed")
    }
    render() {
        let interview = this.props.interview
        return (
            <div className='interview'>
                <div>{interview.type}</div>
                <div>{interview.interviewerName}</div>
                <div>{interview.date}</div>
                <div>{interview.status === "Scheduled" ?
                    <div><button onClick={this.pass} >pass</button>
                    <button onClick={this.fail}>fail</button> </div>:null
                }
                   
                </div>
                
                {/* <div>{this.props.interview.processId}</div> */}
                {/* <div>{this.props.interview.simulationDate}</div> */}
                {/* <div>{this.props.interview.status}</div> */}
            </div>
        );
    }
}
export default inject("userStore")(observer(Interview));
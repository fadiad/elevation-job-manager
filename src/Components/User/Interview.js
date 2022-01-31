import React, { Component } from 'react';
import '../../styles/interview.css'
import { observer, inject } from 'mobx-react'
import Fail from './Fail'
import Pass from './Pass'

class Interview extends Component {
    constructor() {
        super()
        this.state = {
            pass: false,
            fail: false,
            openFailDialog: false,
            openPassDialog: false
        }
    }
    setOpenFailDialog = () => {
        this.setState({
            openFailDialog: true
        })
    }
    setCloseFailDialog = () => {
        this.setState({
            openFailDialog: false
        })
    }
    setOpenPassDialog = () => {
        this.setState({
            openPassDialog: true
        })
    }
    setClosePassDialog = () => {
        this.setState({
            openPassDialog: false
        })
    }
    setFail = () => {
        this.setState({
            fail: true
        })
    }
    setPass = () => {
        this.setState({
            fail: true
        })
    }
    // pass = () => {
    //     this.props.userStore.changeStatus(this.props.interview.id, this.props.interview.processId, "Passed" , this.props.interview.type)
    //     this.props.setPass()

    // }

    // fail = () => {
    //     this.props.userStore.changeStatus(this.props.interview.id, this.props.interview.processId, "Failed" ,this.props.interview.type)
    //     this.setState({
    //         fail: true
    //     })
    //     this.props.setProcessUnActive()
    // }
    render() {
        let interview = this.props.interview
        console.log(this.props.interview);
        return (
            <div className='interview'>
                <div>{interview.type}</div>
                <div>{interview.interViewerName}</div>
                <div>{interview.date}</div>

                <div>{interview.status === "Scheduled" && this.state.pass === false && this.state.fail === false ?

                    <div>
                        <button
                            text="fail"
                            onClick={this.setOpenFailDialog}
                        >Fail</button>
                        <button
                            text="pass"
                            onClick={this.setOpenPassDialog}>Pass
                        </button>
                    </div> : null
                }
                </div>
                <div>{this.props.interview.status === "Passed" ?
                    <h4 style={{ color: "green" }}>Passed</h4> : null
                }
                </div>

                <div>{this.props.interview.status === "Failed" ?
                    <h4 style={{ color: "red" }}>failed</h4> : null
                }
                </div>
                <Fail
                    setFail={this.setFail}
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openFailDialog={this.state.openFailDialog}
                    setOpenDialog={this.setOpenFailDialog}
                    setCloseDialog={this.setCloseFailDialog}
                ></Fail>
                <Pass
                    setPass={this.setPass}
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openPassDialog={this.state.openPassDialog}
                    setOpenDialog={this.setOpenPassDialog}
                    setCloseDialog={this.setClosePassDialog}
                ></Pass>
            </div>
        );
    }
}
export default inject("userStore")(observer(Interview));
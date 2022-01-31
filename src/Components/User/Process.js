
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';
import '../../styles/process.css'
import AddInterview from './AddInterview';
import Accepted from './Accepted'
class Process extends Component {

    constructor() {
        super()
        this.state = {
            icon: "-",
            showInterViews: true,
            openDialog: false,
            isProcessActive: true,
            AcceptedOpenDialog : false
        }
    }

    setProcessUnActive = () => {
        this.setState({
            isProcessActive: false
        })
    }
    setOpenDialog = () => {
        this.setState({
            openDialog: true
        })
    }
    
    setCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }
    setAcceptedOpenDialog = () => {
        this.setState({
            AcceptedOpenDialog: true
        })
    }
    setAcceptedCloseDialog = () => {
        this.setState({
            AcceptedOpenDialog: false
        })
    }

    setStatus = (event) => {
        let status = event.target.value
        this.setState({
            status: status
        })
    }
    addProcess = () => {
        this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
    }
    addInterView = () => {
        this.props.userStore.addInterView(this.props.process.id, this.state.status, this.state.date, this.state.interviewerName)
    }

    toggleInterViews = () => {
        if (this.state.showInterViews) {
            this.setState({ icon: "+", showInterViews: false })
        } else {
            this.setState({ icon: "-", showInterViews: true })
        }
    }

    // assignAsAccepted = () => {
    //     this.props.userStore.assignAsAccepted(this.props.process.id)
    //     this.setProcessUnActive();
    // }

    render() {
        console.log(this.props.userStore.processes);
        return (
            <div className='Process'>
                <div class="mdc-card">
                    <h3 className='icon' onClick={this.toggleInterViews}>{this.state.icon}</h3>
                    <h3>
                        {this.props.process.companyName}
                    </h3>
                    <h3>
                        {this.props.process.jobTitle}
                    </h3>
                    <h3>
                        {this.props.process.location}
                    </h3>
                    <h3>
                        {this.props.process.foundBy}
                    </h3>
                </div>
                {this.state.showInterViews ?
                    <div>
                        <div className='interviews'>
                            <div><h2>Interviews</h2></div>

                            <div>
                                {  this.props.process.status === "In progress"?
                                    <div>
                                        <button
                                            text="Add new Interivew"
                                            onClick={this.setOpenDialog}
                                        >add interView
                                        </button>
                                        <button 
                                        onClick={this.setAcceptedOpenDialog}
                                        >accepted</button>
                                    </div> : null
                                }
                            </div>

                        </div>
                      
                        <Interviews setProcessUnActive={this.setProcessUnActive} interviews={this.props.process.interviews} />
                    </div> :
                    null}
                      <Accepted
                         openDialog={this.state.AcceptedOpenDialog}
                         setOpenDialog={this.setAcceptedOpenDialog}
                         setCloseDialog={this.setAcceptedCloseDialog}
                         processId={this.props.process.id}
                         id = {this.props.process.id}
                         
                         setProcessUnActive = {this.props.setProcessUnActive}
                    ></Accepted> 
                <AddInterview
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    processId={this.props.process.id}
                    setCloseDialog={this.setCloseDialog}
                ></AddInterview>
            </div>
        );
    }

}

export default inject("userStore")(observer(Process))

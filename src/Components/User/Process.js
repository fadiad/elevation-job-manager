/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';
import '../../styles/process.css'
import DateMomentUtils from '@date-io/moment'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import TextField from '@mui/material/TextField';
import AddInterview from './AddInterview';
// import  Controls  from '@mui/material';
class Process extends Component {

    constructor() {
        super()
        this.state = {
            icon: "-",
            showInterViews: true,
            openDialog: false
        }
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

    assignAsAccepted = () => {
        this.props.userStore.assignAsAccepted(this.props.process.id)
    }

    render() {
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
                            <button
                                text="Add new Interivew"
                                onClick={this.setOpenDialog}
                            >add interView
                            </button>
                            <div><button onClick={this.assignAsAccepted}>accepted</button></div>
                        </div>

                        <Interviews interviews={this.props.process.interviews} />
                    </div> :
                    null}
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

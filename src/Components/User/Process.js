/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';
import '../../styles/process.css'
import DateMomentUtils from '@date-io/moment' 
import { 
    DatePicker ,
    MuiPickersUtilsProvider ,
} from '@material-ui/pickers'
import TextField from '@mui/material/TextField';
import AddInterview from './AddInterview';
// import  Controls  from '@mui/material';
 class Process extends Component {

    constructor() {
        super()
        this.state = {
            status: ' ',
            interviewerName: ' ',
            icon: "-",
            showInterViews:true,
            date : new Date(),
            openDialog : false
        }
    }

    setOpenDialog = () =>{
        this.setState({
            openDialog : true
        })
    }

    handleDateChange = (value) => {
        this.setState({
            date : value
        })
    }
    
    
    setDate = (event) => {
        let date = event.target.value
        this.setState({
            date: date
        })
    }
    setInterviewerName = (event) => {
        let interviewerName = event.target.value
        this.setState({
            interviewerName: interviewerName
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
    addInterView =() =>{
        this.props.userStore.addInterView(this.props.process.id , this.state.status , this.state.date , this.state.interviewerName)
    }
    toggleInterViews = () => {
        if(this.state.showInterViews){
            this.setState({icon:"+",showInterViews:false})
        }else{
            this.setState({icon:"-",showInterViews:true})
        }
    }
    render() {
        return (
            <div className='Process'>
                <button                 
                text = "Add new Interivew"
                onClick={this.setOpenDialog}
                >
                </button>

                
            <from className='inputs'>
                <select value={this.state.status} onChange={this.setStatus}>
                    <option value="Phone">Phone</option>
                    <option value="HR">HR</option>
                    <option value="Technical">Technical</option>
                    <option value="Contract">Contract</option>
                </select>
               <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <DatePicker value={this.state.date} onChange={this.handleDateChange}/>
                    {/* <TimePicker value={this.state.selectedDate} onChange={this.handleDateChange}/> */}
                    {/* <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} /> */}
               </MuiPickersUtilsProvider>
                <input type="text" placeholder='interviewer Name' onChange={this.setInterviewerName} />
                <TextField 
                variant="outlined"
                label="Interviewer Name"
                value={this.state.interviewerName}
                onChange={this.setInterviewerName}
                />
            </from>
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
                    <div><button onClick={this.addInterView} >add interView</button></div>
                    <div><button>accepted</button></div>
                </div>

                <Interviews interviews={this.props.process.interviews} />
                </div>:
                null}
                <AddInterview 
                    openDialog = {this.state.openDialog}
                    setOpenDialog = {this.setOpenDialog}
                ></AddInterview>
            </div>
        );
    }

}
 


export default inject("userStore")(observer(Process))

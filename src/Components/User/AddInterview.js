/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import {Dialog,DialogTitle , Grid,} from '@material-ui/core'
import DateMomentUtils from '@date-io/moment' 
import { 
    DatePicker ,
    MuiPickersUtilsProvider ,
} from '@material-ui/pickers'
import TextField from '@mui/material/TextField';

class AddInterview extends Component {

   
    constructor() {
        super()
        this.state = {
            status: ' ',
            interviewerName: ' ',
            date : new Date(),
        }
    }
    setDate = (event) => {
        let date = event.target.value
        this.setState({
            date: date
        })
    }
    
    handleDateChange = (value) => {
        this.setState({
            date : value
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
    addInterView =() =>{
        // let date =this.state.date._d 
        // let date = this.state.date._d.getFullYear() + "-" + "-"
        this.props.userStore.addInterView(2 , this.state.status , this.state.date._d , this.state.interviewerName)
    }
    ShowInterView = ()=>{
        console.log(this.state.date._d);
        console.log(this.state.status);
        console.log(this.state.interviewerName);
    }
    render() {
        return (
            <div className='AddInterview'>
                <Dialog open={this.props.openDialog}>
                    <DialogTitle>
                        <div>
                        Add Interview
                        </div>
                    </DialogTitle>

                <from className='inputs'>
                <Grid item lg={4}>
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
                </Grid>
                <button onClick={this.addInterView}>Add</button>
                <button>cancel</button>
            </from>
                </Dialog>
            </div>
        );
    }
}
export default inject("userStore")(observer(AddInterview));


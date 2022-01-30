/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import { Dialog, DialogTitle, Grid, } from '@material-ui/core'
import DateMomentUtils from '@date-io/moment'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import '../../styles/AddInterview.css'

class AddInterview extends Component {


    constructor() {
        super()
        this.state = {
            status: ' ',
            interviewerName: ' ',
            date: new Date(),
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
            date: value
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
    addInterView = () => {
        // let date =this.state.date._d 
        // let date = this.state.date._d.getFullYear() + "-" + "-"
        this.props.userStore.addInterView(this.props.processId, this.state.status, this.state.date._d, this.state.interviewerName)
        this.handleClose();
    }

    handleClose = () => {
        this.props.setCloseDialog()
    }


    render() {
        return (
            <Dialog

                onClose={this.handleClose}
                open={this.props.openDialog}
                fullWidth

                // maxWidth = {'xs'}
                PaperProps={{
                    sx: {
                        width: "30%",
                        maxHeight: "100%"
                    }
                }}
            >

                <DialogTitle>
                    <div>
                        Add Interview
                    </div>
                </DialogTitle>
                <div className='inputs' >
                    <FormControl className='FormControl'  >
                        <InputLabel className='InputLabel'>Type</InputLabel>
                        <Select className='Select' value={this.state.status} onChange={this.setStatus}>
                            <MenuItem value={'Phone'}>Phone</MenuItem>
                            <MenuItem value={'HR'}>HR</MenuItem>
                            <MenuItem value={'Technical'}>Technical</MenuItem>
                            <MenuItem value={'Contract'}>Contract</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <select value={this.state.status} onChange={this.setStatus}>
                                <option value="Phone">Phone</option>
                                <option value="HR">HR</option>
                                <option value="Technical">Technical</option>
                                <option value="Contract">Contract</option>
                            </select> */}
                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                        <DatePicker value={this.state.date} onChange={this.handleDateChange} />
                        {/* <TimePicker value={this.state.selectedDate} onChange={this.handleDateChange}/> */}
                        {/* <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} /> */}
                    </MuiPickersUtilsProvider>
                    <TextField
                        variant="outlined"
                        label="Interviewer Name"
                        value={this.state.interviewerName}
                        onChange={this.setInterviewerName}
                    />
                </div>
                <button onClick={this.addInterView}>Add</button>
                <button onClick={this.handleClose}> cancel</button>
            </Dialog>
        );
    }
}
export default inject("userStore")(observer(AddInterview));


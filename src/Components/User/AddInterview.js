/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, Grid, } from '@material-ui/core'
import DateMomentUtils from '@date-io/moment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'


import '../../styles/AddInterview.css'
import { invalid } from 'moment';

class AddInterview extends Component {


    constructor() {
        super()
        this.state = {
            type: 'Phone',
            interviewerName: ' ',
            date: new Date(),
            dateError: false
        }
    }

    // setDate = (event) => {
    //     let date = event.target.value
    //     this.setState({
    //         date: date
    //     })
    // }

    handleDateChange = (value) => {
        this.setState({
            dateError: false
        }, function () {
            this.setState({
                date: value
            })
        })
    }

    setInterviewerName = (event) => {
        let interviewerName = event.target.value
        this.setState({
            interviewerName: interviewerName
        })
    }

    setType = (event) => {
        let type = event.target.value
        this.setState({
            type: type
        })
    }

    addInterView = () => {
        if (this.isValid(this.state.date._d)) {
            this.props.userStore.addInterView(this.props.processId, this.state.type, this.state.date._d, this.state.interviewerName)
            this.handleClose();
        } else {
            console.log("did not add interview ");
            this.setState({
                dateError: true
            })
        }
    }

    isValid = (date) => {
        if (!date) {
            return false
        }
        return true
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
                    <div className='DialogTitle'>
                        Add Interview
                    </div>
                </DialogTitle>
                <div className='inputs' >
                    <div className='inpt'>
                        <FormControl className='FormControl'  >
                            <InputLabel className='InputLabel'>Type</InputLabel>
                            <Select className='Select' value={this.state.type} onChange={this.setType} required>
                                <MenuItem value={'Phone'}>Phone</MenuItem>
                                <MenuItem value={'HR'}>HR</MenuItem>
                                <MenuItem value={'Technical'}>Technical</MenuItem>
                                <MenuItem value={'Contract'}>Contract</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    
                    <div className='inpt'>
                        <TextField
                            variant="outlined"
                            label="Interviewer Name"
                            value={this.state.interviewerName}
                            onChange={this.setInterviewerName}
                        />
                    </div>

                    <div className='inpt'>
                        <MuiPickersUtilsProvider utils={DateMomentUtils}>
                            <DatePicker error={this.state.dateError} value={this.state.date} onChange={this.handleDateChange} />
                            {/* <TimePicker value={this.state.selectedDate} onChange={this.handleDateChange}/> */}
                            {/* <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} /> */}
                        </MuiPickersUtilsProvider>
                        <CalendarTodayIcon></CalendarTodayIcon>
                    </div>

                </div>


                <div className='Buttons'>
                    <Button style={{ margin: "10px" }} size="medium" variant="contained" onClick={this.addInterView}>Add</Button>
                    <Button size="medium" variant="contained" onClick={this.handleClose}>cancel</Button>
                </div>

            </Dialog>
        );
    }
}
export default inject("userStore")(observer(AddInterview));


import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle } from '@material-ui/core'
import DateMomentUtils from '@date-io/moment'
import TextField from '@mui/material/TextField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import '../../styles/Filter.css'


class AddSimulationDate extends Component {

    constructor() {
        super()
        this.state = {
            date: new Date(),
            dateError: false
        }
    }


    handleDateChange = (value) => {
        this.setState({
            dateError: false
        }, function () {
            this.setState({
                date: value
            })
        })
    }

    handleClose = () => {
        this.props.setCloseDialog()
    }


    addSimulationDate = () => {
        if (this.isValid(this.state.date._d)) {
            console.log("add addSimulationDate ");
            console.log(this.state.date._d);
            // this.props.userStore.addInterView(this.props.processId, this.state.type, this.state.date._d, this.state.interviewerName)
            this.handleClose();
        } else {
            console.log("did not add addSimulationDate ");
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

    render() {
        return (
            <div className='addProcess'>
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
                            set simulation date
                        </div>
                    </DialogTitle>

                    <div className='inputs' >
                        <MuiPickersUtilsProvider utils={DateMomentUtils}>
                            <div className='inpt' >
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </MuiPickersUtilsProvider>

                        <div className='Buttons'>
                            <Button style={{ margin: "10px" }} size="medium" variant="contained" onClick={this.addSimulationDate}>Add</Button>
                            <Button size="medium" variant="contained" onClick={this.handleClose}>cancel</Button>
                        </div>

                    </div>
                </Dialog>
            </div>

        );
    }
}
export default inject("adminStore")(observer(AddSimulationDate))
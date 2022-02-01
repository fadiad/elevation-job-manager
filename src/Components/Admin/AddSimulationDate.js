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
            primaryDate: new Date(),
            secondaryDate1: '',
            secondaryDate2: ''
        }
    }


    handlePrimaryDateChange = (e) => {
        this.setState({
            primaryDate: e.target.value
        })
    }

    handleSecondary1DateChange = (e) => {
        this.setState({
            secondaryDate1: e.target.value
        })
    }

    handleSecondary2DateChange = (e) => {
        this.setState({
            secondaryDate2: e.target.value
        })
    }


    handleClose = () => {
        this.props.setCloseDialog()
    }


    addSimulationDate = () => {
        this.props.adminStore.addSimulationDate(this.state.primaryDate, this.state.secondaryDate1, this.state.secondaryDate2)
        this.handleClose();
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
                                    required
                                    id="datetime-local"
                                    label="Primary Simulation Date"
                                    type="datetime-local"
                                    defaultValue="2022-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handlePrimaryDateChange}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="Optional Simulation Date"
                                    type="datetime-local"
                                    defaultValue="2022-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleSecondary1DateChange}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="Optional Simulation Date"
                                    type="datetime-local"
                                    defaultValue="2022-05-24T10:30"
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleSecondary2DateChange}
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
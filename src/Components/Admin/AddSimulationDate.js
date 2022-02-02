import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle } from '@material-ui/core'
import DateMomentUtils from '@date-io/moment'
import TextField from '@mui/material/TextField';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


import '../../styles/Filter.css'


class AddSimulationDate extends Component {

    constructor() {
        super()
        this.state = {
            primaryDate: '',
            secondaryDate1: '',
            secondaryDate2: '',
            primaryDateError: false,
            openSuccess: false,
            openFail: false
        }
    }

    handleSuccess = () => {
        this.setState({
            openSuccess: true
        })
    }
    handleFail = () => {
        this.setState({
            openFail: true
        })
    }


    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSuccess: false,
            openFail: false
        })
    };


    handlePrimaryDateChange = (e) => {
        this.setState({
            primaryDateError: false
        }, function () {
            this.setState({
                primaryDate: e.target.value
            })
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
        this.setState({
            primaryDate: '',
            secondaryDate1: '',
            secondaryDate2: '',
            primaryDateError: false
        })
    }


    addSimulationDate = async () => {

        if (this.isValid()) {
            let status = await this.props.adminStore.addSimulationDate(this.state.primaryDate, this.state.secondaryDate1, this.state.secondaryDate2)

            if (status == 200) {
                this.handleSuccess()
                setTimeout(() => {
                    this.handleClose();
                    this.setState({
                        openSuccess: false
                    })
                }, 3000);
            } else {
                this.handleFail()
            }

        } else {
            this.setState({
                primaryDateError: true
            })
        }
    }

    isValid = () => {
        if (this.state.primaryDate == '') {
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
                                    error={this.state.primaryDateError}
                                    required
                                    id="datetime-local"
                                    label="Primary Simulation Date"
                                    type="datetime-local"
                                    // defaultValue="`${this.state.primaryDate}`"
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
                                    defaultValue=" "
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
                                    defaultValue=" "
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleSecondary2DateChange}
                                />
                            </div>
                        </MuiPickersUtilsProvider>

                        <Snackbar open={this.state.openSuccess} autoHideDuration={5000} onClose={this.handleCloseMessage}>
                            <Alert severity="success">Dates Added Successfully!</Alert>
                        </Snackbar>

                        <Snackbar open={this.state.openFail} autoHideDuration={5000} onClose={this.handleCloseMessage}>
                            <Alert severity="error">Make sure that you entered your data in a right way !</Alert>
                        </Snackbar>

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
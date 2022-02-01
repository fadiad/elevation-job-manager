import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Button from '@mui/material/Button';
import { Dialog, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import { Grid } from '@material-ui/core';
import '../../styles/addProcess.css'


class AddProcess extends Component {

    constructor() {
        super()
        this.state = {
            companyName: ' ',
            jobTitle: ' ',
            location: ' ',
            link: ' ',
            foundBy: 'linkedIn',
            companyNameError: false,
            jobTitleError: false,
            locationError: false,
            open: false
        }
    }

    handleClick = () => {
        this.setState({
            open: true
        })
    };

    setLink = (event) => {
        let link = event.target.value
        this.setState({
            link: link
        })
    }

    setCompanyName = (event) => {
        let companyName = event.target.value

        if (companyName.trim() == '') {
            this.setState({
                companyNameError: true
            })
        } else {
            this.setState({
                companyNameError: false
            }, function () {
                this.setState({
                    companyName: companyName
                })
            })
        }
    }


    setJobTitle = (event) => {
        let jobTitle = event.target.value

        if (jobTitle.trim() == '') {
            this.setState({
                jobTitleError: true
            })
        } else {
            this.setState({
                jobTitleError: false
            }, function () {
                this.setState({
                    jobTitle: jobTitle
                })
            })
        }
    }

    setLocation = (event) => {
        let location = event.target.value

        if (location.trim() == '') {
            this.setState({
                locationError: true
            })
        } else {
            this.setState({
                locationError: false
            }, function () {
                this.setState({
                    location: location
                })
            })
        }
    }

    setFoundBy = (event) => {
        let foundBy = event.target.value
        this.setState({
            foundBy: foundBy
        })
    }

    addProcess = () => {
        let company = false
        let jobTitle = false
        let location = false

        if (this.state.companyName.trim() == '') {
            company = true
            this.setState({
                companyNameError: true
            })
        }
        if (this.state.jobTitle.trim() == '') {
            jobTitle = true
            this.setState({
                jobTitleError: true
            })
        }
        if (this.state.location.trim() == '') {
            location = true
            this.setState({
                locationError: true
            })
        }


        // if (!this.state.companyNameError && !this.state.jobTitleError && !this.state.locationError) {
        if (!company && !jobTitle && !location) {
            console.log("i added process");
            this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
            this.handleClose();
        } else {
            console.log("i did not add the process");
            this.handleClick()
        }
    }

    handleClose = () => {
        this.props.setCloseDialog()
    }


    handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false
        })
    };

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
                            width: "5%",
                            maxHeight: "20%"
                        }
                    }}
                >
                    <DialogTitle>
                        <div className='DialogTitle'>
                            Add Process
                        </div>
                    </DialogTitle>
                    {/* <form className='root'> */}

                    {/* <Grid container>
                            <Grid item lg={1}> */}

                    <div className='inputs' >
                        {/* <div className='inpt'> */}
                        <TextField
                            required
                            size="small"
                            error={this.state.companyNameError}
                            variant="outlined"
                            label="Company Name"
                            onChange={this.setCompanyName}
                        />
                        {/* </div> */}

                        {/* <div className='inpt'> */}
                        <TextField
                            required
                            size="small"
                            label="Job Title"
                            error={this.state.jobTitleError}
                            onChange={this.setJobTitle}
                        />
                        {/* </div> */}
                        {/* <div className='inpt'> */}
                        <TextField
                            required
                            size="small"
                            id="outlined-textarea"
                            label="Location"
                            error={this.state.locationError}
                            onChange={this.setLocation}
                        />
                        {/* </div> */}
                        {/* <div className='inpt'> */}
                        <TextField
                            size="small"
                            id="outlined-textarea"
                            label="Link"
                            onChange={this.setLink}
                        />
                        {/* </div> */}

                      
                        
                        <div className='inpt'>
                            <FormControl className='FormControl' >
                                <InputLabel className='InputLabel'>foundBy</InputLabel>
                                <Select className='Select' value={this.state.foundBy} onChange={this.setFoundBy}>
                                    <MenuItem value={'facebook'}>facebook</MenuItem>
                                    <MenuItem value={'linkedIn'}>linkedIn</MenuItem>
                                    <MenuItem value={'friend'}>friend</MenuItem>
                                    <MenuItem value={'other'}>other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <Snackbar open={this.state.open} autoHideDuration={5000} onClose={this.handleCloseError}>
                            <Alert severity="error">Make sure that you entered your data in a right way !</Alert>
                        </Snackbar>

                        <div className='Buttons'>
                            <Button style={{ margin: "10px" }} color="primary" variant="contained" onClick={this.addProcess}>add process</Button>
                            <Button variant="contained" onClick={this.handleClose}>cancel</Button>
                        </div>
                    </div>
                    {/* </Grid>
                        </Grid> */}
                    {/* </form> */}

                </Dialog>

            </div>
        );
    }
}
export default inject("userStore")(observer(AddProcess));


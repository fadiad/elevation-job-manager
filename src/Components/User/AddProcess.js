import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


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
            foundBy: ' '
        }
    }

    setLink = (event) => {
        let link = event.target.value
        this.setState({
            link: link
        })
    }

    setCompanyName = (event) => {
        let companyName = event.target.value

        this.setState({
            companyName: companyName
        })
    }

    setJobTitle = (event) => {
        let jobTitle = event.target.value
        this.setState({
            jobTitle: jobTitle
        })
    }

    setLocation = (event) => {
        let location = event.target.value
        this.setState({
            location: location
        })
    }

    setFoundBy = (event) => {
        let foundBy = event.target.value
        this.setState({
            foundBy: foundBy
        })
    }

    addProcess = () => {
        this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
        this.handleClose();
    }
    handleClose = () => {
        this.props.setCloseDialog()
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
                        <div>
                            Add Process
                        </div>
                    </DialogTitle>
                    <form className='root'>
                        <Grid container>
                            <Grid item lg={1}>
                                <TextField
                                    variant="outlined"
                                    label="Company Name"
                                    onChange={this.setCompanyName}
                                />
                                <TextField
                                    required
                                    label="Job Title"
                                    onChange={this.setJobTitle}
                                />
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    label="Location"
                                    onChange={this.setLocation}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Link"
                                    onChange={this.setLink}
                                />
                                <FormControl className='FormControl' >
                                    <InputLabel className='InputLabel'>status</InputLabel>
                                    <Select className='Select' value={this.state.foundBy} onChange={this.setFoundBy}>
                                        <MenuItem value={'facebook'}>facebook</MenuItem>
                                        <MenuItem value={'linkedIn'}>linkedIn</MenuItem>
                                        <MenuItem value={'friend'}>friend</MenuItem>
                                        <MenuItem value={'other'}>other</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button color="primary" variant="contained" onClick={this.addProcess}>add process</Button>
                                <Button  variant="contained" onClick={this.handleClose}>cancel</Button>

                            </Grid>
                        </Grid>
                    </form>

                </Dialog>

            </div>
        );
    }
}
export default inject("userStore")(observer(AddProcess));


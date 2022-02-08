import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle } from '@material-ui/core'
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import '../../../styles/addProcess.css'
import ShowSimulationTable from './ShowSimulationTable'
import theme from '../../theme';

class ShowSimulations extends Component {

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
  
    handleClose = () => {this.props.setCloseDialog()}

    render() {
        return (
            <div className='addProcess'>
                <Dialog
                    onClose={this.handleClose}
                    open={this.props.openDialog}
                    fullWidth
                    maxWidth = {'l'}
                    PaperProps={{
                        sx: {
                            maxHeight: "100%"
                        }
                    }}
                >
                    <DialogTitle>
                        <div className='DialogTitle'>
                        SIMULATIONS FOR SCHEDULED INTERVIEWS
                        </div>
                    </DialogTitle>
                    <ShowSimulationTable />
                    <ThemeProvider theme={theme}>
                        <Button size="medium" variant="contained" onClick={this.handleClose}>Close</Button>
                    </ThemeProvider>
                </Dialog>
            </div>
        );
    }
}
export default inject("adminStore")(observer(ShowSimulations));
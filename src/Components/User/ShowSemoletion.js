import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle } from '@material-ui/core'
import '../../styles/addProcess.css'
import ShowSemoletionTable from './ShowSemoletionTable'

class ShowSemoletion extends Component {

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
                    maxWidth = {'l'}
                    PaperProps={{
                        sx: {
                            maxHeight: "100%"
                        }
                    }}
                >
                    
                    <DialogTitle>
                        <div className='DialogTitle'>
                        SEMOLETION FOR SCHEDULED INTERVIEWS
                        </div>
                    </DialogTitle>
                    <ShowSemoletionTable />
                </Dialog>
            </div>
        );
    }
}
export default inject("userStore")(observer(ShowSemoletion));


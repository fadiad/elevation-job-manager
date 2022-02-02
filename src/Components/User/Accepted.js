import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';
import Pass from './Pass';

class Accepted extends Component {

    constructor() {
        super()
        this.state = {
            status: ' ',
        }
    }
    handleClose = () => {
        this.props.setCloseDialog()
    }
    assignAsAccepted = () => {
        this.props.userStore.assignAsAccepted(this.props.id)
        let date = new Date()
        // this.props.userStore.addInterView(this.props.processId, this.state.status, this.state.date._d, this.state.interviewerName)

        this.props.userStore.addInterView(this.props.processId, "Contract", date, "", 'Passed')
        this.props.setProcessUnActive();
        this.handleClose();
    }
    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openDialog}
                fullWidth
                PaperProps={{
                    sx: {
                        width: "30%",
                        maxHeight: "100%"
                    }
                }}
            >
                <DialogTitle>
                    <div>
                        contract Interview
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Did she sign the contract ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.assignAsAccepted} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default inject("userStore")(observer(Accepted));


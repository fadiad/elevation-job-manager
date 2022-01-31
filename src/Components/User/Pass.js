import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';

class Pass extends Component {

    constructor() {
        super()
        this.state = {
            status: ' ',

        }
    }

    handleClose = () => {
        this.props.setCloseDialog()
    }
    pass = () => {
        this.props.userStore.changeStatus(this.props.id, this.props.processId, "Passed" , this.props.type)
        this.props.setPass()
        this.handleClose();
    }
    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openPassDialog}
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
                        PASS the {" " + this.props.type + " "} Interview
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you Passed the interview
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.pass} autoFocus>
                        Agree
                    </Button>
                </DialogActions>



            </Dialog>

        );
    }
}
export default inject("userStore")(observer(Pass));


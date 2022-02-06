import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle,  DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';

class Fail extends Component {

    handleClose = () => {this.props.setCloseDialog()}
    
    fail = () => {
        this.props.userStore.changeStatus(this.props.id, this.props.processId, "Failed" ,this.props.type)
        this.handleClose();
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openFailDialog}
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
                        FAIL the {" " + this.props.type + " "} Interview
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you failed the interview
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.fail} autoFocus>
                        Agree
                    </Button>
                </DialogActions>



            </Dialog>
        );
    }
}
export default inject("userStore")(observer(Fail));


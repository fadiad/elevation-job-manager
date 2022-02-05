import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

class DeleteQuestion extends Component {




    handleClose = () => {
        this.props.setCloseDialog()
    }

    deleteQuestion = () => {
        this.props.adminStore.deleteQuestion(this.props.questionId)
        this.handleClose();
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openDeleteDialog}
                fullWidth
                PaperProps={{
                    sx: {
                        width: "30%",
                        maxHeight: "100%"
                    }
                }}
            >
                <DialogTitle>
                        Delete Question
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want delete the question
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.deleteQuestion} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default inject("adminStore")(observer(DeleteQuestion));


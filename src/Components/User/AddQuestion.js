import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

class AddQuestion extends Component {

    constructor() {
        super()
        this.state = {
            status: ' ',
            question: ' ',
            title: ' '
        }
    }
    handleChange = (event) => {
        this.setState({
            question: event.target.value
        })
    };
    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
        console.log(this.state.title);
    }
    handleClose = () => {
        this.props.setCloseDialog()
    }

    addQuestion = () => {
        this.props.userStore.setNewQuestionFromInterview(this.props.id, this.state.question, this.state.title)
        this.handleClose();
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openQuestionDialog}
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
                        Add Question from the Interview
                    </div>
                </DialogTitle>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={this.handleChangeTitle}

                />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Question"
                    multiline
                    // value={this.}
                    onChange={this.handleChange}
                    rows={4}
                    defaultValue=""
                />
                <DialogActions>
                    {/* <Button >add</Button> */}
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.addQuestion} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default inject("userStore")(observer(AddQuestion));


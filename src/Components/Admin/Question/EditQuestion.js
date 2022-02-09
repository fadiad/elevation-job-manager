import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

class EditQuestion extends Component {

    constructor() {
        super()

        this.state = {
            status: ' ',
            title: ' ',
            question: ' ',
            solution: ' '
        }
        let title = " "
        let question = " "
        let solution = " "
    }

    handleChangeQuestion = (event) => {
        this.setState({
            question: event.target.value
        })
        console.log(this.state.question);
    };
    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
        console.log(this.state.title);
    }
    handleChangeSulotion = (event) => {
        this.setState({
            solution: event.target.value
        })
    }
    handleClose = () => {
        this.props.setCloseDialog()
    }

    editQuestion = () => {
        this.setState({
            title: this.state.title === ' ' ? this.props.title : this.state.title,
            question: this.state.question === ' ' ? this.props.question : this.state.question,
            solution: this.props.solution === ' ' ? this.props.solution : this.state.solution
        })
        this.title = this.state.title === ' ' ? this.props.title : this.state.title
        this.question = this.state.question === ' ' ? this.props.question : this.state.question
        this.solution = this.state.solution === ' ' ? this.props.solution : this.state.solution
        this.props.adminStore.editQuestion(this.props.questionId, this.title, this.question, this.solution)
        this.handleClose();
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openEditDialog}
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
                        Edit Question
                    </div>
                </DialogTitle>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={this.handleChangeTitle}
                    defaultValue={this.props.title}

                />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Question"
                    multiline
                    // value={this.}
                    onChange={this.handleChangeQuestion}
                    rows={4}
                    defaultValue={this.props.question}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Sulotion"
                    multiline
                    // value={this.}
                    onChange={this.handleChangeSulotion}
                    rows={4}
                    defaultValue={this.props.solution}
                />
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={this.editQuestion} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default inject("adminStore")(observer(EditQuestion));


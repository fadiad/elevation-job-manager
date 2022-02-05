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
            sulotion: ' ',
            title : ' ',
            qustion : ' ',  
            solution : ' '   
        }
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
    handleChangeSulotion= (event) => {
        this.setState({
            solution: event.target.value
        })
        console.log(this.state.title);
    }
    handleClose = () => {
        this.props.setCloseDialog()
    }

    addSulotion = () => {
        console.log("addSulotion");
        // this.props.adminStore.addSulotion(this.props.questionId,  this.state.sulotion)
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
                <br/>
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
                    <Button onClick={this.addSulotion} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
export default inject("adminStore")(observer(EditQuestion));


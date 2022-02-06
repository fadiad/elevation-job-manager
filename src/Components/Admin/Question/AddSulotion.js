import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

class AddSulotion extends Component {

    constructor() {
        super()
        this.state = {
            status: ' ',
            sulotion: ' ',
        }
    }
    handleChange = (event) => {
        this.setState({
            sulotion: event.target.value
        })
        console.log(this.state.sulotion);
    };

    handleClose = () => {
        this.props.setCloseDialog()
    }

    addSulotion = () => {
        console.log("addSulotion");
        this.props.adminStore.addSulotion(this.props.questionId,  this.state.sulotion)
        this.props.adminStore.getQustions()
        this.handleClose();
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.openSulotionDialog}
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
                         Add Sulotion 
                    </div>
                </DialogTitle>
               
                <TextField
                    id="outlined-multiline-static"
                    label="Sulotion"
                    multiline
                    // value={this.}
                    onChange={this.handleChange}
                    rows={4}
                    defaultValue=""
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
export default inject("adminStore")(observer(AddSulotion));


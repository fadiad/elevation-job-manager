import React, { Component } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../../../styles/editDialog.css'

export class EditProfile extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            lastName: "",
            password: "",
            passwordValidator: "",
            email: "",
            phone: "",
            permissionPassword: "",
            passwordError: false,
            passwordValidatorError: false,
            permissionPasswordError: false,
            openSuccess: false
        }
    }

    setPermissionPassword = (event) => {
        let permissionPassword = event.target.value
        this.setState({
            permissionPassword: permissionPassword
        })
    }


    handleClose = () => {
        this.props.setCloseDialog()
    }


    setLastName = (event) => {
        let lastName = event.target.value
        this.setState({
            lastName: lastName
        })
    }

    setPasswordValidator = (event) => {
        let passwordValidator = event.target.value
        this.setState({
            passwordValidator: passwordValidator
        })
    }

    setName = (event) => {
        let name = event.target.value
        this.setState({
            name: name
        })
    }

    setPassword = (event) => {
        let password = event.target.value
        this.setState({
            password: password
        })
    }

    setPhone = (event) => {
        let phone = event.target.value
        this.setState({
            phone: phone
        })
    }

    sendEdits = async () => {
        let passWordEqual = true
        let passEnterd = true

        if (this.state.password != this.state.passwordValidator) {
            passWordEqual = false
            this.setState({
                passwordError: true,
                passwordValidatorError: true
            })
        } else {
            this.setState({
                passwordError: false,
                passwordValidatorError: false
            })
        }
        if (this.state.permissionPassword != this.props.Password) {
            passEnterd = false
            this.setState({
                permissionPasswordError: true
            })
        } else {
            this.setState({
                permissionPasswordError: false
            })
        }

        if (passWordEqual && passEnterd) {
            let status = await this.props.sendEdits(this.state.name, this.state.lastName, this.state.password, this.state.email, this.state.phone)
           
            if (status == 200) {
                this.handleSuccess()
                setTimeout(() => {
                    this.handleClose();
                    this.setState({
                        openSuccess: false
                    })
                }, 3000);
            }
        }
    }

    handleSuccess = () => {
        this.setState({
            openSuccess: true
        })
    }


    handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSuccess: false,
            openFail: false
        })
    };


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
                    <div className='DialogTitle'>
                        Edit Profile Data
                    </div>
                </DialogTitle>

                <div className='container'>


                    <div className='inpts' >
                        <div className='inp'>
                            <TextField
                                variant="outlined"
                                label="New First Name"
                                value={this.state.interviewerName}
                                onChange={this.setName}
                            />
                        </div>


                        <div className='inp'>
                            <TextField
                                variant="outlined"
                                label="New Last Name"
                                value={this.state.lastName}
                                onChange={this.setLastName}
                            />
                        </div>

                        <div className='inp'>
                            <TextField
                                variant="outlined"
                                label="New Phone"
                                value={this.state.phone}
                                onChange={this.setPhone}
                            />
                        </div>

                    </div>

                    <div className='password'>

                        <div className='inp'>
                            <TextField
                                error={this.state.passwordError}
                                variant="outlined"
                                label="New Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.setPassword}
                            />
                        </div>

                        <div className='inp'>
                            <TextField
                                error={this.state.passwordValidatorError}
                                variant="outlined"
                                label="Validate New Password"
                                type="password"
                                value={this.state.passwordValidator}
                                onChange={this.setPasswordValidator}
                            />
                        </div>
                        <br />
                        <br />
                        <div className='inp'>
                            <TextField
                                error={this.state.permissionPasswordError}
                                variant="outlined"
                                label="Current Password"
                                type="password"
                                value={this.state.permissionPassword}
                                onChange={this.setPermissionPassword}
                            />
                        </div>
                        <h5>please write your password to make the edits</h5>
                    </div>

                </div>

                <div className='Buttons'>
                    <Button style={{ margin: "10px" }} size="medium" variant="contained" onClick={this.sendEdits}>Send Edits</Button>
                    <Button size="medium" variant="contained" onClick={this.handleClose}>cancel</Button>
                </div>

                <Snackbar open={this.state.openSuccess} autoHideDuration={5000} onClose={this.handleCloseMessage}>
                    <Alert severity="success">Proccess Added Successfully!</Alert>
                </Snackbar>

            </Dialog >
        );
    }
}

export default EditProfile;

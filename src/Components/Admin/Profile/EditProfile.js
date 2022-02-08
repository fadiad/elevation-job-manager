import React, { Component } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
            permissionPasswordError: false
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

    setEmail = (event) => {
        let email = event.target.value
        this.setState({
            email: email
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

    sendEdits = () => {
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
            this.props.sendEdits(this.state.name ,this.state.lastName, this.state.password, this.state.email, this.state.phone)
        }
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
                                label="New Email"
                                value={this.state.email}
                                onChange={this.setEmail}
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

            </Dialog >
        );
    }
}

export default EditProfile;

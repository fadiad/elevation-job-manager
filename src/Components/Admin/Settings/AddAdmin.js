
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Grid, Paper, TextField, Button, ThemeProvider } from '@material-ui/core'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import theme from '../../theme';
import '../../../styles/Admin.css';

class AddAdmin extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
            helperText: {},
            newAdmin: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                type: " "
            }
        }
    }
    paperStyle = { padding: 50, width: 280, margin: "0px auto" }
    logoStyle = { display: "flex", width: "40px" }
    btnstyle = { margin: '8px 0' }


    addAdmin = () => {
        let helperTextCopy = { ...this.state.helperText }

            (this.state.newAdmin.firstName === "") ? helperTextCopy.firstName = "Empty Field" : null
        (this.state.newAdmin.lastName === "") ? helperTextCopy.lastName = "Empty Field" : null
        (this.state.newAdmin.email === "") ? helperTextCopy.email = "Empty Field" : null
        (this.state.newAdmin.phone === "") ? helperTextCopy.phone = "Empty Field" : null
        (this.state.newAdmin.type === "") ? helperTextCopy.type = "Empty Field" : null
        if (helperTextCopy // 👈 null and undefined check
            && Object.keys(helperTextCopy).length === 0
            && Object.getPrototypeOf(helperTextCopy) === Object.prototype) {
            let result = this.props.adminStore.addAdmin(this.state.newAdmin)
            if (!result) {
                helperTextCopy.email = "Email Already Exist!" 
                this.setState({ helperText: helperTextCopy })
            }
        }
        else {
            this.setState({ helperText: helperTextCopy })
        }

    }

    togglePanel = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            this.setState({
                expanded: panel
            })
        } else {
            this.setState({
                expanded: false
            })
        }
    };

    render() {
        return (
            <div className='page'>
                <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.togglePanel('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <h3>New Admin</h3>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Grid>
                            <Paper elevation={10} style={this.paperStyle}>
                                <Grid>
                                    <img src="/elevation.png" style={this.logoStyle} />
                                </Grid>
                                <form fullWidth>
                                    <TextField label='First Name' placeholder='Enter Admin First Name' fullWidth required
                                        error={this.state.newAdmin.firstName === ""}
                                        helperText={this.state.helperText.firstName }
                                        onChange={(event) => {
                                            let adminCopy = { ...this.state.newAdmin }
                                            adminCopy.firstName = event.target.value;
                                            this.setState({
                                                newAdmin: adminCopy
                                            })
                                        }} />

                                    <TextField label='Last Name' placeholder='Enter Admin Last Name' fullWidth required
                                        error={this.state.newAdmin.lastName === ""}
                                        helperText={this.state.helperText.lastName}
                                        onChange={(event) => {
                                            let adminCopy = { ...this.state.newAdmin }
                                            adminCopy.lastName = event.target.value;
                                            this.setState({
                                                newAdmin: adminCopy
                                            })
                                        }} />

                                    <TextField label='Email' placeholder='Enter Admin Email' fullWidth required
                                        error={this.state.newAdmin.email === ""}
                                        helperText={this.state.helperText.email}
                                        onChange={(event) => {
                                            let adminCopy = { ...this.state.newAdmin }
                                            adminCopy.email = event.target.value;
                                            this.setState({
                                                newAdmin: adminCopy
                                            })
                                        }} />

                                    <TextField label='Phone' placeholder='Enter Admin Phone' fullWidth required
                                        error={this.state.newAdmin.phone === ""}
                                        helperText={this.state.helperText.phone}
                                        onChange={(event) => {
                                            let adminCopy = { ...this.state.newAdmin }
                                            adminCopy.phone = event.target.value;
                                            this.setState({
                                                newAdmin: adminCopy
                                            })
                                        }} />

                                    <InputLabel id="select-type-label">Type</InputLabel>
                                    <Select fullWidth
                                        onChange={(event) => {
                                            let adminCopy = { ...this.state.newAdmin }
                                            adminCopy.type = event.target.value;
                                            this.setState({
                                                newAdmin: adminCopy
                                            })
                                        }}
                                        label="Type"
                                        labelId='select-type-label'
                                        error={this.state.newAdmin.type === ""}
                                        helperText={this.state.helperText.type}
                                    >
                                        <MenuItem value={""}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="Technical">Technical</MenuItem>
                                    </Select>
                                    <FormHelperText>{this.state.helperText.type}</FormHelperText>
                                </form>
                                <ThemeProvider theme={theme}>
                                    <Button type='submit' color='primary' variant="contained" style={this.btnstyle} fullWidth onClick={this.addAdmin}>Add Admin</Button>
                                </ThemeProvider>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default inject("adminStore")(observer(AddAdmin));

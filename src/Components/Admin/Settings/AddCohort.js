
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Grid, Paper, TextField, Button, ThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Stack from '@mui/material/Stack';
import theme from '../../theme';
import DateMomentUtils from '@date-io/moment'
class AddCohort extends Component {
    constructor(){
        super()
        this.state={
            newcohort:{
                name:"",
                startDate:"",
                endDate:"",
                deadline:""
            }
        }
    }
    paperStyle = { padding:50 , height: '50vh', width: 280, margin: "50px auto" }
    logoStyle = { display: "flex", width: "40px" }
    btnstyle = { margin: '8px 0' }

    handleChange = (prop) =>(event)=>{
        let cohortCopy = {...this.state.newcohort}
        cohortCopy[prop] = event.target.value;
        this.setState({newcohort:cohortCopy})
    }
    render(){
        return(
            <Grid>
            <Paper elevation={10} style={this.paperStyle}>
                <Grid align='center'>
                    <Stack spacing={2}>
                        <img src="elevation.png" style={this.logoStyle} />
                        <img src="atidna_Logo.png" style={this.logoStyle} />
                    </Stack>
                    <h2>New Cohort</h2>
                </Grid>
                <TextField label='Name' placeholder='Enter name' fullWidth required onChange={this.handleName} />
                <MuiPickersUtilsProvider utils={DateMomentUtils}>
                            <div className='inpt' >
                                <TextField
                                    required
                                    id="datetime-local"
                                    label="start Date"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event)=>this.handleChange('startdate')}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="End Date"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event)=>this.handleChange('endDate')}
                                />
                            </div>
                            <div className='inpt'>
                                <TextField
                                    id="datetime-local"
                                    label="Deadline"
                                    type="datetime-local"
                                    defaultValue={new Date()}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event)=>this.handleChange('deadline')}
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                
                 <ThemeProvider theme={theme}>
                    <Button type='submit' color='primary' variant="contained" style={this.btnstyle} fullWidth onClick={this.addCohort}>Add Cohort</Button>
                </ThemeProvider>
            </Paper>
        </Grid>
        );
    }
}

export default inject("adminStore")(observer(AddCohort));


import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Grid, Paper, TextField, Button, ThemeProvider } from '@material-ui/core'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import theme from '../../theme';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker'; 
class AddCohort extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
            newcohort: {
                name: "",
                startDate: new Date(),
                endDate: new Date(),
                deadline: new Date()
            }
        }
    }
    paperStyle = { padding: 50, width: 280, margin: "0px auto" }
    logoStyle = { display: "flex", width: "40px" }
    btnstyle = { margin: '8px 0' }

    
    addCohort = () => {
        this.props.adminStore.addCohort(this.state.newcohort)
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
            <div>
                <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.togglePanel('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <h3> Opening new Cohort</h3>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Grid>
                            <Paper elevation={10} style={this.paperStyle}>
                                <Grid align='center'>
                                    <Stack direction="row" spacing={2}>
                                        <img src="/elevation.png" style={this.logoStyle} />
                                        <span style={{ backgroundColor: "#ff96aa" }}>
                                            <img src="/atidna_Logo.png" style={this.logoStyle} />
                                        </span>
                                    </Stack>
                                </Grid>
                                <TextField label='Name' placeholder='Enter Cohort Name' fullWidth required
                                    onChange={(event) => {
                                        let cohortCopy = { ...this.state.newcohort }
                                        cohortCopy.name = event.target.value;
                                        this.setState({
                                            newcohort: cohortCopy
                                        })
                                    }} />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        label="Year, month and date"
                                        value={this.state.newcohort.startDate}
                                        onChange={(newValue) => {
                                            let cohortCopy = { ...this.state.newcohort }
                                            cohortCopy.startDate = newValue;
                                            this.setState({
                                                newcohort: cohortCopy
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                    <DatePicker
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        label="Year, month and date"
                                        value={this.state.newcohort.endDate}
                                        onChange={(newValue) => {
                                            let cohortCopy = { ...this.state.newcohort }
                                            cohortCopy.endDate = newValue;
                                            this.setState({
                                                newcohort: cohortCopy
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                    <DatePicker
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        label="Year, month and date"
                                        value={this.state.newcohort.deadline}
                                        onChange={(newValue) => {
                                            let cohortCopy = { ...this.state.newcohort }
                                            cohortCopy.deadline = newValue;
                                            this.setState({
                                                newcohort: cohortCopy
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>

                                <ThemeProvider theme={theme}>
                                    <Button type='submit' color='primary' variant="contained" style={this.btnstyle} fullWidth onClick={this.addCohort}>Add Cohort</Button>
                                </ThemeProvider>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default inject("adminStore")(observer(AddCohort));

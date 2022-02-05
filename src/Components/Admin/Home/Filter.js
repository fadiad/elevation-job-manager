import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../../styles/Filter.css'
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

class Filter extends Component {

    StatusChange = (e) => {
        this.props.adminStore.setStatus(e.target.value)
    }
    CohortChange = (e) => {
        this.props.adminStore.setCohort(e.target.value)
    }
    filterBy = () => {
        this.props.adminStore.getUsersInterviews()
        this.props.adminStore.getStatisticsByFilter()
    }
    
    render() {
        return (
            <div className='Filter'>
                <FormControl className='FormControl' >
                    <InputLabel className='InputLabel'>status</InputLabel>
                    <Select className='Select' value={this.props.adminStore.statusByFilter} onChange={this.StatusChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Scheduled'}>Scheduled</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Passed'}>Passed</MenuItem>
                        <MenuItem value={'Failed'}>Failed</MenuItem>
                        <MenuItem value={'No Reply'}>No Reply</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='FormControl' >
                    <InputLabel className='InputLabel'>Cohort</InputLabel>
                    <Select className='Select' onChange={this.CohortChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Atidna 1'}>Atidna 1</MenuItem>
                        <MenuItem value={'Atidna 2'}>Atidna 2</MenuItem>
                        <MenuItem value={'Atidna 3'}>Atidna 3</MenuItem>
                        <MenuItem value={'Atidna 4'}>Atidna 4</MenuItem>
                    </Select>
                </FormControl>
                <ThemeProvider theme={theme}>
                        <Button color='primary' variant="text" startIcon={<SearchIcon />} onClick={this.filterBy}>Search</Button>
                    </ThemeProvider>
            </div>
        );
    }
}


export default inject("adminStore")(observer(Filter))
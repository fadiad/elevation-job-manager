import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../../styles/Filter.css'
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
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
        console.log(this.props.adminStore.usersInterViews)
    }
    
    render() {
        return (
            <div className='Filter'>
                <FormControl className='FormControl' >
                    <Select className='Select' value={this.props.adminStore.statusByFilter} onChange={this.StatusChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Scheduled'}>Scheduled</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Passed'}>Passed</MenuItem>
                        <MenuItem value={'Failed'}>Failed</MenuItem>
                        <MenuItem value={'No Reply'}>No Reply</MenuItem>
                    </Select>
                    <FormHelperText >Status</FormHelperText>
                </FormControl>
                <FormControl className='FormControl' >
                    <Select className='Select' onChange={this.CohortChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Atidna 1'}>Atidna 1</MenuItem>
                        <MenuItem value={'Atidna 2'}>Atidna 2</MenuItem>
                        <MenuItem value={'Atidna 3'}>Atidna 3</MenuItem>
                        <MenuItem value={'Atidna 4'}>Atidna 4</MenuItem>
                    </Select>
                    <FormHelperText>Cohort</FormHelperText>

                </FormControl>
                <ThemeProvider theme={theme}>
                        <Button color='primary' variant="text" startIcon={<SearchIcon />} onClick={this.filterBy}>Search</Button>
                    </ThemeProvider>
            </div>
        );
    }
}


export default inject("adminStore")(observer(Filter))
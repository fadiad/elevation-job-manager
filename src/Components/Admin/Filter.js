
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../styles/Filter.css'
import {Select , MenuItem , FormControl , InputLabel} from '@material-ui/core'
class Filter extends Component {
    

    StatusChange =(e) =>{
       console.log(e.target.value); 
       this.props.adminStore.setStatus(e.target.value)
       console.log(this.props.adminStore);
    }
    CohortChange = (e) =>{
        console.log(e.target.value); 
        this.props.adminStore.setCohort(e.target.value)
        console.log(this.props.adminStore);
    }
    filterBy = () => {
        this.props.adminStore.getUsersInterviews()
    }
    render() {

        return (
            <div className='Filter'>
                <FormControl className='FormControl' >
                    <InputLabel className='InputLabel'>status</InputLabel>
                    <Select className='Select' onChange={this.StatusChange}>
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
                    <Select className='Select'  onChange={this.CohortChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Atidna 1'}>Atidna 1</MenuItem>
                        <MenuItem value={'Atidna 2'}>Atidna 2</MenuItem>
                        <MenuItem value={'Atidna 3'}>Atidna 3</MenuItem>
                        <MenuItem value={'Atidna 4'}>Atidna 4</MenuItem>
                    </Select>
                </FormControl>
                <button id='filterButton' onClick={this.filterBy}>search !</button>
            </div>
        );
    }
}


export default inject("adminStore")(observer(Filter))
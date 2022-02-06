/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavBar from '../../AdminNavBar';
import '../../../styles/Admin.css'
import '../../theme';
import DisplayQuestion from './DisplayQuestion';
import { TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            changeCompany: "",
            inputValue: "",
            jobTitle: "",
            HR : true ,
            technical : true
        }
    }
    onChangeHR = () => {
            this.setState({
                HR: this.state.HR  ? false : true
            })
    }
    onChangeTechnical = () => {
        this.setState({
            technical: this.state.technical ? false : true
        })
    }
    onChangeCompany = (e) => {
        this.setState({
            changeCompany: e.target.value,
        })
    }
    onChangeJob = (e) => {
        this.setState({
            jobTitle: e.target.value,
        })
        console.log(this.state.jobTitle);
    }
    handleChange = (panel) => (event, isExpanded) => {
        let isExp
        if (isExpanded) {
            isExp = panel
        } else {
            isExp = false
        }
        this.setState({ expanded: isExp })

    };
    componentDidMount() {
        this.props.adminStore.getQustions()
    }
    render() {
        this.props.adminStore.qustions
        return (
            <div className='questions'>
                <NavBar />
                <br></br>
                <br></br>

                <FormGroup row={true}>
                    <FormControlLabel onChange={this.onChangeHR} control={<Checkbox defaultChecked />} label="Technical" />
                    <FormControlLabel onChange={this.onChangeTechnical} control={<Checkbox defaultChecked/>} label="HR" />
                    <TextField id="outlined-basic" onChange={this.onChangeCompany} label="Company" variant="outlined" />
                    <TextField id="outlined-basic" onChange={this.onChangeJob} label="Job" variant="outlined" />

                </FormGroup>
                <br></br>

                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="main-header"
                >
                    <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>company </Typography>
                    <Typography sx={{ width: '20%', flexShrink: 0, color: '#ff96aa' }}>Job </Typography>
                    <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Interview Type </Typography>
                    <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Date</Typography>
                    <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Interviewed </Typography>

                </AccordionSummary>
                {/* {this.props.catalog.filter(cat => cat.isRented == true && cat.title.toLowerCase().includes(this.inputValue.toLowerCase())). */}
                {this.props.adminStore.qustions.filter(q => 
                q.interviewType.includes(this.state.HR === true ?"" : "HR" ) &&
                q.interviewType.includes(this.state.technical === true ? "" : "Technical" ) && 
                q.jobTitle.toLowerCase().includes(this.state.jobTitle.toLowerCase()) &&
                q.companyName.toLowerCase().includes(this.state.changeCompany.toLowerCase())).map((row, index) => {
                    return (
                        <DisplayQuestion row={row} index={index} />

                    )
                }
                )}

            </div>
        );
    }
}
export default inject("adminStore")(observer(Questions))
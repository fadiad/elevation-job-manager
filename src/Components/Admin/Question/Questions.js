/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavBar from '../../NavBar';
import '../../../styles/Admin.css'
import '../../theme';
import DisplayQuestion from './DisplayQuestion';
import { TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        }
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
            <div className='querstion'>
                <NavBar />
                <br></br>
                <br></br>
             
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="HR" />
                    <FormControlLabel control={<Checkbox />} label="Technical" />

                </FormGroup>
                <TextField id="outlined-basic" label="Company" variant="outlined" />
                <TextField id="outlined-basic" label="Job" variant="outlined" />
                <br></br>

                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>company </Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#ff96aa' }}>Date</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Job </Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Interviewed </Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Interview Type </Typography>
                    </AccordionSummary>

                {this.props.adminStore.qustions.map((row, index) => {
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
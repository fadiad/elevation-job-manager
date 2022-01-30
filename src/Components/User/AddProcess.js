import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import '../../styles/addProcess.css'


class AddProcess extends Component {

    constructor() {
        super()
        this.state = {
            companyName: ' ',
            jobTitle: ' ',
            location: ' ',
            link: ' ',
            foundBy: ' '
        }
    }

    setLink = (event) => {
        let link = event.target.value
        this.setState({
            link: link
        })
    }

    setCompanyName = (event) => {
        let companyName = event.target.value

        this.setState({
            companyName: companyName
        })
    }
    setJobTitle = (event) => {
        let jobTitle = event.target.value
        this.setState({
            jobTitle: jobTitle
        })
    }
    setLocation = (event) => {
        let location = event.target.value
        this.setState({
            location: location
        })
    }

    setFoundBy = (event) => {
        let foundBy = event.target.value
        this.setState({
            foundBy: foundBy
        })
    }


    addProcess = () => {
        this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
    }


    render() {
        return (
            <div className='addProcess'>

                <TextField

                    label="Company Name"
                    onChange={this.setCompanyName}
                />

                <TextField
                    required
                    label="Job Title"
                    onChange={this.setJobTitle}
                />



                <TextField
                    required
                    id="outlined-textarea"
                    label="Location"
                    onChange={this.setLocation}
                />

                <TextField
                    id="outlined-textarea"
                    label="Link"
                    onChange={this.setLink}
                />



                <Button color="primary" variant="contained" onClick={this.addProcess}>add process</Button>




                {/* <TextField
                        variant="outlined"
                        label="Interviewer Name"
                        value={this.state.interviewerName}
                        onChange={this.setInterviewerName}
                    /> */}


                {/* <input type="text" placeholder='Company Name' onChange={this.setCompanyName} />
                <input type="text" placeholder='Job Title' onChange={this.setJobTitle} />
                <input type="text" placeholder='Location' onChange={this.setLocation} />
                <input type="text" placeholder='Link' onChange={this.setLink} />

                <select value={this.state.foundBy} onChange={this.setFoundBy}>
                    <option value="facebook">facebook</option>
                    <option value="linkedIn">linkedIn</option>
                    <option value="friend">friend</option>
                    <option value="other">other</option>
                </select>


                <button onClick={this.addProcess}>add process</button> */}

            </div>
        );
    }
}
export default inject("userStore")(observer(AddProcess));


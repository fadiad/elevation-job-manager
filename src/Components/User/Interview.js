import React, { Component } from 'react';
import '../../styles/interview.css'
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../theme';

import Fail from './Fail'
import Pass from './Pass'

class Interview extends Component {
    constructor() {
        super()
        this.state = {
            pass: false,
            fail: false,
            openFailDialog: false,
            openPassDialog: false
        }
    }
    setOpenFailDialog = () => {
        this.setState({
            openFailDialog: true
        })
    }
    setCloseFailDialog = () => {
        this.setState({
            openFailDialog: false
        })
    }
    setOpenPassDialog = () => {
        this.setState({
            openPassDialog: true
        })
    }
    setClosePassDialog = () => {
        this.setState({
            openPassDialog: false
        })
    }
    setFail = () => {
        this.setState({
            fail: true
        })
    }
    setPass = () => {
        this.setState({
            fail: true
        })
        }
    render() {
        let interview = this.props.interview
        console.log(this.props.interview);
        return (
            <div className='interview'>
                <div>{interview.type}</div>
                <div>{interview.interViewerName}</div>
                <div>{interview.date}</div>
                <div><Button disabled={interview.simulationDate === undefined}>Simulation</Button></div>
                <div>{interview.status === "Scheduled" ?
                    <div>
                        <Stack spacing={2} direction="row">
                            <ThemeProvider theme={theme}>
                                <Button color="success" variant="outlined" startIcon={<DoneSharpIcon />} onClick={this.setOpenPassDialog}>Pass</Button>
                                <Button color="error" variant="outlined" startIcon={<ClearSharpIcon />} onClick={this.setOpenFailDialog}>Fail</Button>
                            </ThemeProvider>
                        </Stack>
                    </div> : this.props.interview.status === "Passed" ?
                    <h4 style={{ color: "green" }}>Passed</h4> : this.props.interview.status === "Failed" ?
                    <h4 style={{ color: "red" }}>failed</h4> : null
                }
                </div>

                <Fail
                    setFail={this.setFail}
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openFailDialog={this.state.openFailDialog}
                    setOpenDialog={this.setOpenFailDialog}
                    setCloseDialog={this.setCloseFailDialog}
                ></Fail>
                <Pass
                    setPass={this.setPass}
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openPassDialog={this.state.openPassDialog}
                    setOpenDialog={this.setOpenPassDialog}
                    setCloseDialog={this.setClosePassDialog}
                ></Pass>
            </div>
        );
    }
}
export default inject("userStore")(observer(Interview));
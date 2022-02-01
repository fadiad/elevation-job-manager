
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircleIcon from '@mui/icons-material/Circle';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import '../../styles/process.css'
import AddInterview from './AddInterview';
import Accepted from './Accepted'
class Process extends Component {

    constructor() {
        super()
        this.state = {
            icon: <ExpandMoreIcon />,
            expand: false,
            openDialog: false,
            isProcessActive: true,
            AcceptedOpenDialog: false
        }
    }

    setProcessUnActive = () => { this.setState({ isProcessActive: false }) }
    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }
    setAcceptedOpenDialog = () => { this.setState({ AcceptedOpenDialog: true }) }
    setAcceptedCloseDialog = () => { this.setState({ AcceptedOpenDialog: false }) }

    setStatus = (event) => { this.setState({ status: event.target.value }) }

    addProcess = () => {
        this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
    }
    addInterView = () => {
        this.props.userStore.addInterView(this.props.process.id, this.state.status, this.state.date, this.state.interviewerName)
    }

    toggleInterViews = () => {
        if (this.state.expand) {
            this.setState({ icon: <ExpandMoreIcon />, expand: false })
        } else {
            this.setState({ icon: <ExpandLessIcon />, expand: true })
        }
    }

    // assignAsAccepted = () => {
    //     this.props.userStore.assignAsAccepted(this.props.process.id)
    //     this.setProcessUnActive();
    // }
    statusStyle = () => {
        let color = ""
        switch (this.props.process.status) {
            case "Passed":
                color = "green";
                break;
            case "Failed":
                color = "red"
                break;
            case "In progress":
                color = "orange";
                break;
        }
        return { fill: color, padding: "17px 0" }

    }
    render() {
        console.log(this.props.userStore.processes);
        return (
            <div className='Process'>
                <div class="mdc-card">
                    <div className='status-circle'><CircleIcon style={this.statusStyle()} /></div>
                    <h3 className='icon' onClick={this.toggleInterViews}>{this.state.icon}</h3>
                    <h3>{this.props.process.companyName}</h3>
                    <h3>{this.props.process.jobTitle}</h3>
                    <h3>{this.props.process.location}</h3>
                </div>
                {this.state.expand ?
                    <div>
                        <div className='process-sub'>
                            <h4>{this.props.process.foundBy}</h4>
                            <h4>{this.props.process.link}</h4>
                        </div>
                        <div className='interviews-header'>
                            <div>
                                <h2>Interviews</h2>
                            </div>
                            <div>
                                <Stack spacing={2} direction="row">
                                    <ThemeProvider theme={theme}>
                                        <Button variant="text" disabled={this.props.process.status !== "In progress"} startIcon={<AddSharpIcon />} onClick={this.setOpenDialog}>Add Interview</Button>
                                        <Button variant="contained" disabled={this.props.process.status !== "In progress"} startIcon={<TaskAltSharpIcon />} onClick={this.setAcceptedOpenDialog}>Accepted</Button>
                                    </ThemeProvider>
                                </Stack>
                            </div>
                        </div>
                        <Interviews setProcessUnActive={this.setProcessUnActive} interviews={this.props.process.interviews} />
                    </div> : null}

                <Accepted
                    openDialog={this.state.AcceptedOpenDialog}
                    setOpenDialog={this.setAcceptedOpenDialog}
                    setCloseDialog={this.setAcceptedCloseDialog}
                    processId={this.props.process.id}
                    id={this.props.process.id}
                    setProcessUnActive={this.setProcessUnActive}
                ></Accepted>
                <AddInterview
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    processId={this.props.process.id}
                    setCloseDialog={this.setCloseDialog}
                ></AddInterview>
            </div>
        );
    }

}

export default inject("userStore")(observer(Process))

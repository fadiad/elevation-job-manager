import React, { Component } from 'react';
import '../../styles/interview.css'
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import AddQuestion from './AddQuestion';
import Fail from './Fail'
import Pass from './Pass'

class Interview extends Component {
    constructor() {
        super()
        this.state = {
            openFailDialog: false,
            openPassDialog: false,
            openDialog: false
        }
    }
    setOpenFailDialog = () => { this.setState({ openFailDialog: true }) }
    setCloseFailDialog = () => { this.setState({ openFailDialog: false }) }
    setOpenPassDialog = () => { this.setState({ openPassDialog: true }) }
    setClosePassDialog = () => { this.setState({ openPassDialog: false }) }

    setOpenQuestionDialog = () => { this.setState({ openDialog: true }) }
    setCloseQuestionDialog = () => { this.setState({ openDialog: false }) }
    render() {
        let interview = this.props.interview
        return (
            <div className='interview'>
                <div>{interview.type}</div>
                <div>{interview.interViewerName}</div>
                <div>{interview.date}</div>
                <div>{interview.simulationDate}</div>
                <div><QuestionMarkIcon  className='questionIcons' onClick={this.setOpenQuestionDialog}/></div>
                {/* <div><Button variant="outlined" startIcon={<QuestionMarkIcon />} onClick={this.setOpenQuestionDialog}></Button></div> */}
                <div>{interview.status === "Scheduled" || interview.status === "Pending" ?
                    <div >
                        {/* <Stack spacing={2} direction="row">
                            <ThemeProvider theme={theme}> */}
                        <DoneSharpIcon className='passIcons' onClick={this.setOpenPassDialog} />
                        <ClearSharpIcon className='failIcons' onClick={this.setOpenFailDialog} />
                        {/* <Button color="success" variant="outlined" startIcon={<DoneSharpIcon />} onClick={this.setOpenPassDialog}>Pass</Button>
                                <Button color="error" variant="outlined" startIcon={<ClearSharpIcon />} onClick={this.setOpenFailDialog}>Fail</Button> */}
                        {/* </ThemeProvider>
                        </Stack> */}
                    </div> : this.props.interview.status === "Passed" ?
                        <h4 style={{ color: "green" }}>Passed</h4> : this.props.interview.status === "Failed" ?
                            <h4 style={{ color: "red" }}>failed</h4> : <h4>{this.props.interview.status}</h4>
                }
                </div>
                <Fail
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openFailDialog={this.state.openFailDialog}
                    setOpenDialog={this.setOpenFailDialog}
                    setCloseDialog={this.setCloseFailDialog}
                />
                <Pass
                    id={this.props.interview.id}
                    processId={this.props.interview.processId}
                    type={this.props.interview.type}
                    openPassDialog={this.state.openPassDialog}
                    setOpenDialog={this.setOpenPassDialog}
                    setCloseDialog={this.setClosePassDialog}
                />
                <AddQuestion
                    id={this.props.interview.id}
                    openQuestionDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenQuestionDialog}
                    setCloseDialog={this.setCloseQuestionDialog}
                />
            </div >
        );
    }
}
export default inject("userStore")(observer(Interview));
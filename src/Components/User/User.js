import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Processes from './Processes';
import NavBar from '../NavBar';
import AddProcess from './AddProcess';
import '../../styles/User.css'
import ShowSemoletion from './ShowSemoletion';


class User extends Component {
    constructor() {
        super()
        this.state = {
            openDialog: false,
            openSemoletionDialog: false
        }
    }

    componentDidMount = () => {
        this.props.userStore.getProcesses(this.props.userStore.userID)
        this.props.userStore.getUserData(this.props.userStore.userID)
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }
    setOpenSemoletionDialog = () => {
        this.setState({ openSemoletionDialog: true })
    }
    setCloseSemoletionDialog = () => {
        this.setState({
            openSemoletionDialog: false
        }
        )
    }

    render() {
        return (
            <div>
                <NavBar />
                <Stack padding={"15px"} width={"30%"}>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" startIcon={<AddSharpIcon />} onClick={this.setOpenDialog}>Add Process</Button>
                        <Button variant="contained" startIcon={<AddSharpIcon />} onClick={this.setOpenSemoletionDialog}>Show Semoletion</Button>
                    </ThemeProvider>
                </Stack>

                <AddProcess
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    setCloseDialog={this.setCloseDialog}
                />

                {/* <br /> */}
                <ShowSemoletion
                    openDialog={this.state.openSemoletionDialog}
                    setOpenDialog={this.setOpenSemoletionDialog}
                    setCloseDialog={this.setCloseSemoletionDialog}
                />
                <br />
                {
                    this.props.userStore.userData.isEmployeed === 1 ?
                        <div className='Start-Working'> Employed </div>
                        : null
                }
                <br />
                <Processes processes={this.props.userStore.processes} userId={this.props.userStore.userID} />
            </div>
        );
    }
}
export default inject("userStore")(observer(User))

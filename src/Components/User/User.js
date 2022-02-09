import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Processes from './Processes';
import NavBar from '../UserNavBar';
import AddProcess from './AddProcess';
import '../../styles/User.css'
import ShowSimulation from './ShowSimulations';
import PickSimualtionDate from './PickSimualtionDate';
import cookie from 'react-cookies'


class User extends Component {
    constructor() {
        super()
        this.state = {
            openDialog: false,
            openSimulationDialog: false
        }
    }

    async componentDidMount() {
        await this.props.userStore.getUserData(this.props.userStore.userID)
        await this.props.userStore.getProcesses(this.props.userStore.userID)
        await this.props.userStore.getSimulationsOfInterView()
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }
    setOpenSimulationDialog = () => { this.setState({ openSimulationDialog: true }) }
    setCloseSimulationDialog = () => { this.setState({ openSimulationDialog: false }) }

    render() {
        return (
            <div>
                <NavBar />

                <div className='user-home-header'>
                    <Stack spacing={2} width={"20%"}>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" startIcon={<AddSharpIcon />} onClick={this.setOpenDialog}>Add Process</Button>
                            <Button variant="contained" startIcon={<EventAvailableIcon />} onClick={this.setOpenSimulationDialog}>Show Simulations</Button>
                        </ThemeProvider>
                    </Stack>

                    <AddProcess
                        openDialog={this.state.openDialog}
                        setOpenDialog={this.setOpenDialog}
                        setCloseDialog={this.setCloseDialog}
                    />
                    <ShowSimulation
                        openDialog={this.state.openSimulationDialog}
                        setOpenDialog={this.setOpenSimulationDialog}
                        setCloseDialog={this.setCloseSimulationDialog}
                    />
                    <PickSimualtionDate />

                </div>
                <br />

                <Processes processes={this.props.userStore.processes} userId={this.props.userStore.userID} />
            </div>
        );
    }
}
export default inject("userStore")(observer(User))

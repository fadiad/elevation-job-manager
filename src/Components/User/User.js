import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddSharpIcon from '@mui/icons-material/AddSharp';
<<<<<<< HEAD
=======
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
>>>>>>> 21c8ad2b53faac259b0429ccf566c6871d2779d7
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Processes from './Processes';
import NavBar from '../UserNavBar';
import AddProcess from './AddProcess';
import '../../styles/User.css'
import ShowSimulation from './ShowSimulations';
import PickSimualtionDate from './PickSimualtionDate';


class User extends Component {
    constructor() {
        super()
        this.state = {
            openDialog: false,
<<<<<<< HEAD
            openSemoletionDialog: false
=======
            openSimulationDialog: false
>>>>>>> 21c8ad2b53faac259b0429ccf566c6871d2779d7
        }
    }

    componentDidMount = () => {
        this.props.userStore.getUserData(this.props.userStore.userID)
        this.props.userStore.getProcesses(this.props.userStore.userID)
        this.props.userStore.getSimulationsOfInterView()
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }
<<<<<<< HEAD
    setOpenSemoletionDialog = () => {
        this.setState({ openSemoletionDialog: true })
    }
    setCloseSemoletionDialog = () => {
        this.setState({
            openSemoletionDialog: false
        }
        )
    }
=======
    setOpenSimulationDialog = () => {this.setState({ openSimulationDialog: true })}
    setCloseSimulationDialog = () => {this.setState({openSimulationDialog: false})}
>>>>>>> 21c8ad2b53faac259b0429ccf566c6871d2779d7

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 21c8ad2b53faac259b0429ccf566c6871d2779d7
                <br />

                <Processes processes={this.props.userStore.processes} userId={this.props.userStore.userID} />
            </div>
        );
    }
}
export default inject("userStore")(observer(User))

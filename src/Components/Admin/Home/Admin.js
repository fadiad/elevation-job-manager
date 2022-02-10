import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'
import Filter from './Filter'
import NavBar from '../AdminNavBar';
import '../../../styles/Admin.css';
import Button from '@mui/material/Button';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ShowSimulation from './ShowSimulation';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
class Admin extends Component {
    constructor() {
        super()
        this.state = {
            openSimulationDialog: false
        }
    }
    componentDidMount() {
        this.props.adminStore.getAdminData()
    }
    setOpenSimulationDialog = () => { this.setState({ openSimulationDialog: true }) }
    setCloseSimulationDialog = () => { this.setState({ openSimulationDialog: false }) }

    render() {
        return (
            <div>
                <NavBar />
                <div className='page'>
                    <Filter />
                    <div className='all-statistics'>
                        <GeneralStatistics />
                        <StatisticsByFilter />
                    </div>
                    <h2>INTERVIEWS</h2>
                    <div className='showSimulation'>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" startIcon={<EventAvailableIcon />} onClick={this.setOpenSimulationDialog}>Show Simulations</Button>
                        </ThemeProvider>
                    </div>
                    <UsersInterviews setOpenDialog={this.setOpenDialog} />
                    <ShowSimulation className='MuiDialog-paperFullWidth'
                        openDialog={this.state.openSimulationDialog}
                        setOpenDialog={this.setOpenSimulationDialog}
                        setCloseDialog={this.setCloseSimulationDialog}
                        // maxWidth = {'xs'}
                        PaperProps={{
                            sx: {
                                width: "50%",
                                maxHeight: "20%"
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
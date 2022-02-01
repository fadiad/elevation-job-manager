import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'
import AddSimulationDate from './AddSimulationDate'

import Filter from './Filter'
import NavBar from '../NavBar';

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            openDialog: false
        }
    }

    componentDidMount() {
        this.props.adminStore.getAdminData()
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }

    render() {
        return (
            <div>
                <NavBar />

                <AddSimulationDate
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    setCloseDialog={this.setCloseDialog}
                />

                <Filter />
                adminName : {this.props.adminStore.adminName}
                <GeneralStatistics />
                <StatisticsByFilter />

                {/* <PieChartByFilter/> */}

                <UsersInterviews setOpenDialog = {this.setOpenDialog} />

            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'
// import AddSimulationDate from './AddSimulationDate'

import Filter from './Filter'
import NavBar from '../NavBar';
import '../../styles/Admin.css'
import '../theme';

class Admin extends Component {
    
    componentDidMount() {
        this.props.adminStore.getAdminData()
    }

   

    render() {
        return (
            <div>
                <NavBar />

                {/* <AddSimulationDate
                    openDialog={this.state.openDialog}
                    setOpenDialog={this.setOpenDialog}
                    setCloseDialog={this.setCloseDialog}
                /> */}

                <Filter />
                adminName : {this.props.adminStore.adminName}
                <div className='all-statistics'>
                    <GeneralStatistics/>
                    <StatisticsByFilter/>
                </div>
                
                {/* <PieChartByFilter/> */}

                <UsersInterviews setOpenDialog = {this.setOpenDialog} />

            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
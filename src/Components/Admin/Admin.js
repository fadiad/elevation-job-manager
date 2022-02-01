import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'
import Filter from './Filter'
import NavBar from '../NavBar';
import '../../styles/Admin.css'

class Admin extends Component {

    componentDidMount() {
        this.props.adminStore.getAdminData()
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Filter />
                adminName : {this.props.adminStore.adminName}
                <div className='all-statistics'>
                    <GeneralStatistics/>
                    <StatisticsByFilter/>
                </div>
                
                {/* <PieChartByFilter/> */}
                <UsersInterviews />

            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
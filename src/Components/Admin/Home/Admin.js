import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './UsersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'
import Filter from './Filter'
import NavBar from '../AdminNavBar';
import '../../../styles/Admin.css';
import '../../theme';


class Admin extends Component {

    componentDidMount() {
        this.props.adminStore.getAdminData()
    }
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
                    <UsersInterviews setOpenDialog={this.setOpenDialog} />
                </div>
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
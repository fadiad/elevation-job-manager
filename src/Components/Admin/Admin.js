import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import UsersInterviews from './usersInterviews';
import GeneralStatistics from './GeneralStatistics'
import StatisticsByFilter from './StatisticsByFilter'

import Profile from './Profile'



import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Redirect } from "react-router-dom";

// import AddSimulationDate from './AddSimulationDate'

import DisplayQuestion from '../DisplayQuestion'
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

                {/* <Router>
                    <div>
                        <Route path="/" exact render={() => <Admin />} />
                        <Route path="/Profile" exact render={() => <Profile />} />
                    </div>
                </Router> */}

                <NavBar />


                <Filter />
                adminName : {this.props.adminStore.adminName}
                <div className='all-statistics'>
                    <GeneralStatistics />
                    <StatisticsByFilter />
                </div>

                {/* <PieChartByFilter/> */}

                <UsersInterviews setOpenDialog={this.setOpenDialog} />

                {/* <UsersInterviews setOpenDialog={this.setOpenDialog} /> */}
                <DisplayQuestion/>
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
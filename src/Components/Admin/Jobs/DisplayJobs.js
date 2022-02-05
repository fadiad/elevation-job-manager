/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavBar from '../../NavBar';
import '../../../styles/Admin.css'
import '../../theme';
class DisplayJobs extends Component {

    render() {
        return (
            <div className='Filter'>
                <NavBar />
            </div>
        );
    }
}
export default inject("adminStore")(observer(DisplayJobs))

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PieChartByFilter from './PieChartByFilter';
import '../../styles/Admin.css';
class GeneralStatistics extends Component {
    componentDidMount() {
        this.props.adminStore.getStatistics()
    }
    render() {

        return (
            <div className='statistics'>
                <h3>General Statistics : </h3>
                <PieChartByFilter 
                    student    = {this.props.adminStore.statisticsByFilter.student}    
                    employed   = {this.props.adminStore.statisticsByFilter.employed}  
                    unEmployed = {this.props.adminStore.statisticsByFilter.unEmployed}
                    InProcess  = {this.props.adminStore.statisticsByFilter.InProcess} 
                    NotActive  = {this.props.adminStore.statisticsByFilter.NotActive}     
                />
            </div>
        );
    }
}
export default inject("adminStore")(observer(GeneralStatistics))
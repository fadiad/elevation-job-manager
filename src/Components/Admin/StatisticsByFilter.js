
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PieChartByFilter from './PieChartByFilter'
import '../../styles/Admin.css'
class StatisticsByFilter extends Component {
    componentDidMount() {
        this.props.adminStore.getStatisticsByFilter()
    }
    render() {
        // console.log(this.props.adminStore.Statistics);
        console.log(this.props.adminStore.statisticsByFilter.student); 

        return (
            <div className='statistics'>
                <h3>Statistics By Filter : </h3>
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
export default inject("adminStore")(observer(StatisticsByFilter))
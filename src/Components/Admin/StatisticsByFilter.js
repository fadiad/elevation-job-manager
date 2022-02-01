
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PieChartByFilter from './PieChartByFilter'

class StatisticsByFilter extends Component {
    componentDidMount() {
        this.props.adminStore.getStatisticsByFilter()
    }
    render() {
        // console.log(this.props.adminStore.Statistics);
        console.log(this.props.adminStore.statisticsByFilter.student); 

        return (
            <div>
                <span>Statistics By Filter : </span>
                <br />
                <span>student    {this.props.adminStore.statisticsByFilter.student}   </span><br />
                {/* <span>employed   {this.props.adminStore.statisticsByFilter.employed}  </span><br />
                <span>unEmployed {this.props.adminStore.statisticsByFilter.unEmployed}</span><br />
                <span>InProcess  {this.props.adminStore.statisticsByFilter.InProcess} </span><br />
                <span>NotActive  {this.props.adminStore.statisticsByFilter.NotActive} </span> */}
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
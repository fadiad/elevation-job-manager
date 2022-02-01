
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PieChartByFilter from './PieChartByFilter'

class GeneralStatistics extends Component {
    componentDidMount() {
        this.props.adminStore.getStatistics()
    }
    render() {

        return (
            <div>
                <span>General Statistics : </span>
                <br />
                <span>student {this.props.adminStore.generalStatistics.student }</span>
                {/* <br />
                <span>employed {this.props.adminStore.generalStatistics.employed }</span>
                <br />
                <span>unEmployed {this.props.adminStore.generalStatistics.unEmployed }</span>
                <br />
                <span>InProcess {this.props.adminStore.generalStatistics.InProcess }</span>
                <br/>
                <span>NotActive {this.props.adminStore.generalStatistics.NotActive }</span>               */}
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
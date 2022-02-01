
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
                <PieChartByFilter
                    student    = {this.props.adminStore.generalStatistics.student}    
                    employed   = {this.props.adminStore.generalStatistics.employed}  
                    unEmployed = {this.props.adminStore.generalStatistics.unEmployed}
                    InProcess  = {this.props.adminStore.generalStatistics.InProcess} 
                    NotActive  = {this.props.adminStore.generalStatistics.NotActive}     
                />
            </div>
        );
    }
}
export default inject("adminStore")(observer(GeneralStatistics))
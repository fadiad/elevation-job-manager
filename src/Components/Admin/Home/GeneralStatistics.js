
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PieChartByFilter from './PieChartByFilter';
import '../../../styles/Admin.css';
class GeneralStatistics extends Component {
    componentDidMount() {
        this.props.adminStore.getStatistics()
    }
    render() {
        console.log(this.props.adminStore.generalStatistics);
        return (
            <div className='statistics'>
                <h3>General Statistics : </h3>
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
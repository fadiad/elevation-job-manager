import React, { Component } from 'react';

export class CohortField extends Component {

    render() {
        return (
            <div className='fileCard'>
                <div> <h3>Cohort</h3> </div>
                <div> <h5>{this.props.cohort}</h5></div>
            </div>
        );
    }
}

export default CohortField;

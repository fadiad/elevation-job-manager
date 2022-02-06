/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class DisplayQuestion extends Component {

    

    componentDidMount() {
        this.props.adminStore.getQustions()
        console.log("getQustions");
    }
    render() {
        this.props.adminStore.qustions
       return (
            <div className='Filter'>
                Display Question
            </div>
        );
    }
}
export default inject("adminStore")(observer(DisplayQuestion))
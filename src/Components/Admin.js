import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Admin extends Component {
    componentDidMount(){
        this.props.AdminStore.getUsersInterviews()
    }
    render(){
        return(
            <div>
                you : {this.props.AdminStore.x}
            </div>
        );
    }
}
export default inject("AdminStore")(observer(Admin));
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Admin extends Component {
    componentDidMount() {
        this.props.adminStore.getUsersInterviews()
    }
    render() {
        return (
            <div>
                you : {this.props.adminStore.x}
            </div>
        );
    }
}
export default inject("adminStore")(observer(Admin))
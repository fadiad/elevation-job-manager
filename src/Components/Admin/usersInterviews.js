import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Interview from './Interview'
// import UsersInterviews from './UsersInterviews';

class UsersInterviews extends Component {
    componentDidMount() {
        this.props.adminStore.getUsersInterviews()
    }
    render(){
        return(
        <div>
                {this.props.adminStore.usersInterViews.map((i, index) => <Interview interview={i} key={index} />)}
        </div>
        );
    }
}
export default inject("adminStore")(observer(UsersInterviews))


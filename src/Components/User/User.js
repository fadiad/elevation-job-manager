import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import  Processes  from './Processes';

class User extends Component {
   
    componentDidMount() {
        this.props.userStore.getUserData()    
          
    }
    render() {
        return (
            <div>
                <span>email : </span>
                <span>{this.props.userStore.user.email }</span>
                <br/>
                <span>first Name : </span>
                <span>{this.props.userStore.user.firstName }</span>
                <br/>
                <span>last Name : </span>
                <span>{this.props.userStore.user.lastName }</span>
                <Processes  />
            </div>
        );
    }
}

export default inject("userStore")(observer(User))



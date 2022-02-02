
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import './styles/App.css';

 class App extends Component {

  constructor() {
    super()
    this.state = {
      role: "",
      userID:0
    }
  }

  setRole = (role) => {
    this.setState({ role: role })
  }

  setUserId = (id) => {
    this.setState({userID : id},() =>{
      this.props.userStore.userID = this.state.userID
      this.props.adminStore.adminId = this.state.userID
    })

  } 
  render() {

    let role = this.state.role
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact render={() => <Login setRole={this.setRole} setUserId={this.setUserId} />} />
            <Route path="/studentPage" exact render={() => <User />} />
            <Route path="/adminPage" exact render={() => <Admin />} />
            <Route path="/signup" exact render={() => <Signup />} />
            {
              role === "admin" ? <Redirect to='/adminPage' /> :
                role === "student" ? <Redirect to='/studentPage' /> : null
            }
           
          </div>
        </Router>
      </div>
    );
  }
}

export default inject("userStore","adminStore")(observer(App))
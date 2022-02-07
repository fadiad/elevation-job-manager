
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Admin from './Components/Admin/Home/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Admin/Profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import './styles/App.css';
import Questions from './Components/Admin/Question/Questions';
import DisplayJobs from './Components/Admin/Jobs/DisplayJobs'
import Settings from './Components/Admin/Settings/Settings';
class App extends Component {

  constructor() {
    super()
    this.state = {
      role: "",
      userID: 0
    }
  }

  setRole = (role) => {
    this.setState({ role: role })
  }

  setUserId = (id) => {
    this.setState({ userID: id }, () => {
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
            <Route path="/adminPage/qustion" exact render={() => <Questions />} />
            <Route path="/adminPage/displayJobs" exact render={() => <DisplayJobs />} />
            <Route path="/adminPage/Settings" exact render={() => <Settings />} />
            <Route path="/signup" exact render={() => <Signup />} />

            <Route path="/Profile" exact render={() => <Profile />} />


            {
              role === "admin" ? <Redirect to='/adminPage' /> :
                role === "student" ? <Redirect to='/studentPage' /> : null
            }
          </div >
        </Router >
      </div >
    );
  }
}

export default inject("userStore", "adminStore")(observer(App))

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Admin from './Components/Admin/Home/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Admin/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import './styles/App.css';
import Questions from './Components/Admin/Question/Questions';
import Jobs from './Components/Admin/Jobs/Jobs'
import Settings from './Components/Admin/Settings/Settings';
import cookie from 'react-cookies'

class App extends Component {

  constructor() {
    super()
    this.state = {
      role: "",
      userID: 0
    }
  }

  // componentWillMount() {
  //   this.setUser(cookie.load('userID'), cookie.load('role'))
  // }

  setUser = (id, role) => {
    this.setState({ userID: id, role: role }, () => {
      if (role === "admin")
        this.props.adminStore.adminId = this.state.userID
      else
        this.props.userStore.userID = this.state.userID
    })
    // cookie.save('userID', id)
    // cookie.save('role', role)
  }

  render() {

    let role = this.state.role
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact render={() => <Login setUser={this.setUser} />} />

            <Route path="/studentPage" exact render={() => <User />} />
            <Route path="/adminPage" exact render={() => <Admin />} />
            <Route path="/adminPage/question" exact render={() => <Questions />} />
            <Route path="/adminPage/Jobs" exact render={() => <Jobs />} />
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

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Admin from './Components/Admin/Home/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Admin/Profile/Profile';
import UserProfile from './Components/User/Profile/UserProfile'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import './styles/App.css';
import Questions from './Components/Admin/Question/Questions';
import Jobs from './Components/Admin/Jobs/Jobs'
import Settings from './Components/Admin/Settings/Settings';
import cookie from 'react-cookies'
import DisplayJobs from './Components/User/DisplayJobs.js'
class App extends Component {

  constructor() {
    super()
    this.state = {
      role: "",
      userID: 0
    }
    // this.temp
  }

  componentWillMount () {
    console.log("App componentWillMount")
    this.setUser(parseInt(cookie.load('userID')),cookie.load('role'))
  }

  componentDidMount () {
    console.log("App componentDidMount")
    console.log(cookie.load('userID')+ cookie.load('role'))
    this.setUser(parseInt(cookie.load('userID')),cookie.load('role'))
  }

  setUser = (id, role) => {
    if(role==="admin"){
      this.props.adminStore.adminId = id;
    }else if (role==="student"){
      this.props.userStore.userID = id;
    }
    this.setState({ userID: id, role: role })
  }

  render() {

    let role = this.state.role
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact render={() => <Login setUser={this.setUser} />} />

            <Route path="/studentPage" exact render={() => <User setUser={this.setUser}/>} />
            <Route path="/studentPage/displayJobs" exact component={() => <DisplayJobs setUser={this.setUser}/>} />
            <Route path="/studentPage/Profile" exact render={() => <UserProfile />} />

            <Route path="/adminPage" exact component={() => <Admin setUser={this.setUser}/>} />
            <Route path="/adminPage/question" exact render={() => <Questions />} />
            <Route path="/adminPage/Jobs" exact render={() => <Jobs />} />
            <Route path="/adminPage/Settings" exact render={() => <Settings />} />
            <Route path="/adminPage/Profile" exact render={() => <Profile />} />

            <Route path="/signup" exact render={() => <Signup />} />


            <Route path="/studentPage/displayJobs" exact render={() => <DisplayJobs />} />


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
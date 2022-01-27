import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import { BrowserRouter as Router, Route ,Link } from 'react-router-dom';
import './styles/App.css';

export class App extends Component {

  constructor(){
    super()
    this.state={
      role:""
    }
  }

  setRole = (role) =>{
    this.setState({role:role})
  }
  render(){

    let role = this.state.role
    return(
      <div>
        <Router>
          <div>
            <Route path="/" exact render={() => <Login setRole={this.setRole} />} />
            <Route path="/studentPage" exact render={() => <User />} />
            <Route path="/adminPage" exact render={() => <Admin />} />
          </div>
        </Router>

        {
         role==="admin"?<Admin />:
         role==="student"?<User />:null
        }
      </div>
    );
  }
}

export default App;
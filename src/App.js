import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
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
        {role===""?
         <Login setRole={this.setRole} />:
         role==="admin"?<Admin />:<User />
        }
      </div>
    );
  }
}

export default App;
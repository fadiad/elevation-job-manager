import React, { Component } from 'react';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Login from './Components/Login';
import './styles/App.css';

export class App extends Component {
  constructor(){
    super();
    this.state={
      user:""
    }
  }
  setUser = (user) => {
    this.setState({user : user});
  }

  render(){
    let user = this.state.user
    return(
      <div>
        <Admin /> 
        {/* {typeof user == "object" 
        ? 
          (user.isAdmin ? <Admin /> : <User />)
        :
          <Login setUser={this.setUser} />
       } */}
        
      </div>
    );
  }
}

export default App;

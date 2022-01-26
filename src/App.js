import React, { Component } from 'react';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User'
import NavBar from './Components/NavBar';
// import NavBar from './Components/Login';
import './styles/App.css';

export class App extends Component {


  render() {
    return <div>
      <NavBar />
      {/* <Login /> */}
     <Admin />
     {/* <User  /> */}
    </div>;
  }
}

export default App;

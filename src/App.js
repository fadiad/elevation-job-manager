import React, { Component } from 'react';
import Admin from './Components/Admin';
import NavBar from './Components/NavBar';
// import NavBar from './Components/Login';
import './styles/App.css';

export class App extends Component {
  render() {
    return <div>
      <NavBar />
      {/* <Login /> */}
     <Admin />
    </div>;
  }
}

export default App;

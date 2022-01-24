import React, { Component } from 'react';
import Admin from './Components/Admin/Admin';
import NavBar from './Components/NavBar';
// import NavBar from './Components/Login';
import './styles/App.css';

export class App extends Component {

  deleteUser(x:number) {
 
  }


  render() {
    return <div>
      <NavBar />
      {/* <Login /> */}
     <Admin />
    </div>;
  }
}

export default App;

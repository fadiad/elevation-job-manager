import axios from 'axios';
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    handleEmail = (event) => this.setState({ email: event.target.value })
    handlePassword = (event) => this.setState({ password: event.target.value })
    login = () => {
        axios.post("http://localhost:8888/login", {
            email: this.state.email,
            password: this.state.password
        })
            .then( (response)  => {
                console.log(response)
                if (response.data.isAdmin) {
                    console.log("you are an admin");
                    this.props.setRole("admin");
                    <Redirect to='/adminPage' />
                } else if (response.data.isAdmin === false) {
                    this.props.userStore.userID = response.data.id
                    console.log("you are a student")
                    this.props.setRole("student");
                    <Redirect to='/studentPage' />
                }
            })
    }
    render() {
        return (
            <div>
                <label>Email:</label> <input type='text' placeholder="email" value={this.state.email} onChange={this.handleEmail} />
                <label>password:</label> <input type='text' placeholder="password" value={this.state.password} onChange={this.handlePassword} />
                <button onClick={this.login}>Login</button>

            </div>
        );
    }
}

export default inject("userStore")(observer(Login))

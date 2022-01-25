import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
    
    const login = () => {
        axios.post("http://localhost:8888/login", {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response.data)
            props.setUser(response.data)
        })
    }

    return(
        <div>
            <label>Email:</label> <input type='text' placeholder="email" value={email} onChange={handleEmail}/>
            <label>password:</label> <input type='text' placeholder="password" value={password} onChange={handlePassword}/>
            <button onClick={login}>Login</button>
        </div>
    );
    
}

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function Login(props) {
    const navigate = useNavigate();

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
            console.log(response)
            if(response.data.isAdmin){
                console.log("you are an admin")
                props.setRole("admin")
                navigate("/adminPage");
            }else if(response.data.isAdmin == false){
                console.log("you are a student")
                props.setRole("student")
            }
        })
    }

    return(
        <div>
            <label>Email:</label> <input type='text' placeholder="email" value={email} onChange={handleEmail}/>
            <label>password:</label> <input type='text' placeholder="password" value={password} onChange={handlePassword}/>
            <button onClick={login}>Login</button>
            {/* <button onClick={loginAdmin}>Login as admin</button> */}
'
        </div>
    );
 
 
}


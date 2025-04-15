import React from "react";
import { useState } from "react";


const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login with", email, password);
        
      };


    return (
        <div className="signin container">
            <h2>Sign in</h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="inputs">
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="inputs">
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Signin;
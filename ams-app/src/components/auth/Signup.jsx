import React from "react";
import { useState } from "react";



const Signup = () => {

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Register with", form);

      };


    return (
        <div className="signup container">
            <h2>Sign up</h2>
            <form className="form" onSubmit={handleRegister}>
                <div className="inputs">
                    <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="inputs">
                    <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="inputs">
                    <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
                <div className="inputs">
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                </div>
                <div className="inputs">
                    <input type="text" placeholder="Phone Number" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="inputs">
                    <input type="text" placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Signup;
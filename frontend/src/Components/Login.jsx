import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const route = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            try {

                const response = await axios.post("http://localhost:8000/login", { userData })
                if (response.data.status == "Success") {
                    // by using context store jwt token into localstorage 
                    toast.success(response.data.message)
                    route('/')
                    setUserData({ email: "", password: "" });
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("Please fill the all fields..")
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input onChange={handleChange} type='email' name='email' value={userData.email} placeholder='Type your email..' /><br />
                <label>Password</label><br />
                <input onChange={handleChange} type='password' name='password' value={userData.password} placeholder='Type your password..' /><br />
                <input type='submit' value='Login' /><br />
            </form>
        </div>
    )
}

export default Login
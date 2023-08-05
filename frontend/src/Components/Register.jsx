import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({ name: "", email: "", role: "Buyer", password: "", confirmPassword: "" })
    const route = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleRoleChange = (event) => {
        setUserData({ ...userData, ["role"]: event.target.value })
    }

    // console.log(userData, "- userData")

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.role && userData.password && userData.confirmPassword) {
            if (userData.password === userData.confirmPassword) {
                try {
                    const response = await axios.post("http://localhost:8000/register", { userData })
                    console.log(response, "response here")
                    if (response.data.status == "Success") {
                        setUserData({ name: "", email: "", role: "Buyer", password: "", confirmPassword: "" })
                        toast.success("Registration Successfull!")
                        route("/login");
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.response.data.message)
                }
            } else {
                alert("Password and Comfirm Password not matched!!")
            }
        } else {
            alert("Please fill the all fields..")
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input type='text' value={userData.name} placeholder='Type your name..' name='name' onChange={handleChange} /><br />
                <label>Email</label><br />
                <input type='email' value={userData.email} placeholder='Type your email..' name='email' onChange={handleChange} /><br />
                <label>Role</label><br />
                <select onChange={handleRoleChange} >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                </select><br />
                <label>Password</label><br />
                <input type='password' value={userData.password} onChange={handleChange} name='password' placeholder='Type password' /><br />
                <label>Confirm Password</label><br />
                <input type='password' value={userData.confirmPassword} onChange={handleChange} name='confirmPassword' placeholder='Type Confirm password' /><br />
                <input type='submit' value="Register" /><br />
            </form>
        </div>
    )
}

export default Register
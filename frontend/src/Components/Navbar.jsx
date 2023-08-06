import React, { useContext } from 'react'
import { AuthContext } from '../Context/Auth.Context'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { state, Logout } = useContext(AuthContext);
    const router = useNavigate()

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1 onClick={() => router("/")}>Home</h1>
            {state?.user?.role == "Admin" && <h1 onClick={() => router("/verify-products")}>Verify Products</h1>}
            <h1 onClick={() => router("/all-products")}>All product</h1>
            {state?.user?.role == "Seller" && <h1 onClick={() => router("/add-product")}>Add product</h1>}
            {state?.user && <h1>Profile</h1>}
            {state?.user?.role == "Buyer" && <h1>Cart</h1>}
            {state?.user ? <h1 onClick={Logout}>Logout</h1> : <h1 onClick={() => router("/login")}>Login</h1>}
        </div >
    )
}

export default Navbar
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Auth.Context'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const VerifyProducts = () => {
    const [notVerifiedProducts, setNotVerifiedProducts] = useState([]);
    const { state } = useContext(AuthContext);
    const router = useNavigate();
    useEffect(() => {
        async function getNotVerifiedProducts() {
            const response = await axios.get("http://localhost:8000/not-verified-products")
            if (response.data.status == "Success") {
                setNotVerifiedProducts(response.data.data)
            }
        }
        if (!state?.user || state.user.role !== "Admin") {
            router("/")
        } else {
            getNotVerifiedProducts();
        }
    }, [state])

    console.log(notVerifiedProducts, "notVerifiedProducts")

    async function VerifyProducts(productId) {
        // toast(productId)
        const response = await axios.patch("http://localhost:8000/verify-product", { productId });
        if (response.data.status == 'Success') {
            router('/all-products')
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div>
            <h1>Verify Products</h1>
            {notVerifiedProducts.length ? <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                {notVerifiedProducts.map((product) => (
                    <div style={{ width: "20%", height: "520px", border: "2px solid black" }}>
                        <img style={{ width: "100%", height: "300px" }} src={product.image} />
                        <h3>Name : {product.name} </h3>
                        <h4>Price : {product.price} $</h4>
                        <h4>Category : {product.category}</h4>
                        <button onClick={() => VerifyProducts(product._id)}>Verify</button>
                    </div>
                ))}
            </div> : <div>Loading...</div>}
        </div>
    )
}

export default VerifyProducts
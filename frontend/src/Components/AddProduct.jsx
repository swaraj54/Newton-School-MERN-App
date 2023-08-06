import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/Auth.Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { state } = useContext(AuthContext)
    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "" });
    const router = useNavigate();

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (productData.name && productData.price && productData.image && productData.category) {
            try {
                const response = await axios.post("http://localhost:8000/add-product", {
                    productData, userId: state?.user?._id
                })
                if (response.data.status == "Success") {
                    toast.success(response.data.message)
                    setProductData({ name: "", price: "", image: "", category: "" });
                    router("/all-products")
                } else {
                    toast.success(response.data.message)
                }

            } catch (error) {
                toast.error(error.message)
            }
        } else {
            toast.error("All fields are mandtory..")
        }
    }

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name</label><br />
                <input value={productData.name} type='text' name="name" onChange={handleChange} /><br />
                <label>Product Price</label><br />
                <input value={productData.price} type='number' name="price" onChange={handleChange} /><br />
                <label>Product Image</label><br />
                <input value={productData.image} type='text' name="image" onChange={handleChange} /><br />
                <label>Product Category</label><br />
                <input value={productData.category} type='text' name="category" onChange={handleChange} /><br />
                <input type='submit' value="Sell Product" /><br />
            </form>
        </div>
    )
}

export default AddProduct
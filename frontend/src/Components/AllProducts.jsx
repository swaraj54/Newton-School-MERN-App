import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);

    console.log(allProducts, "allProducts")
    useEffect(() => {
        async function getProducts() {
            const response = await axios.get("http://localhost:8000/get-products");
            if (response.data.status == "Success") {
                setAllProducts(response.data.data)
            }
        }
        getProducts()
    }, [])

    return (
        <div>
            {allProducts.length ? <div style={{ display: "flex", justifyContent: "space-around", flexWrap:"wrap" }}>
                {allProducts.map((product) => (
                    <div style={{ width: "20%", height: "520px", border: "2px solid black" }}>
                        <img style={{ width: "100%", height: "300px" }} src={product.image} />
                        <h3>Name : {product.name} </h3>
                        <h4>Price : {product.price} $</h4>
                        <h4>Category : {product.category}</h4>
                        <button>Add cart</button>
                    </div>
                ))}
            </div> : <div>Loading...</div>}
        </div>
    )
}

export default AllProducts
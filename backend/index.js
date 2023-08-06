import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { getCurrentUser, login, register } from './contollers/User.controller.js';
import cors from 'cors'
import { addProduct, getProducts, getProductsNotVerified, verifyProduct } from './contollers/Product.controller.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Welcome to Newton School MERN stack Application..")
})

app.post("/register", register)

app.post("/login", login)

app.post("/get-current-user", getCurrentUser)

app.post("/add-product", addProduct)

app.get("/get-products", getProducts)

app.get("/not-verified-products", getProductsNotVerified)

app.patch("/verify-product", verifyProduct)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connedted to DB.")
})

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
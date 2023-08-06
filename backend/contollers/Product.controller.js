import Product from "../modals/Product.modal.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body.productData;
        const { userId } = req.body;
        if (!name) return res.status(404).json({ status: "error", message: "Name is required!" })
        if (!price) return res.status(404).json({ status: "error", message: "Price is required!" })
        if (!category) return res.status(404).json({ status: "error", message: "Category is required!" })
        if (!image) return res.status(404).json({ status: "error", message: "Image is required!" })
        if (!userId) return res.status(404).json({ status: "error", message: "User Id is required!" })

        const product = new Product({
            name, price, category, image, userId
        })
        await product.save();
        return res.status(201).json({ status: "Success", message: "Product added Successfully." })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const getProducts = async (req, res) => {
    try {
        const allProduct = await Product.find({ isVerified: true });
        return res.status(200).json({ status: "Success", data: allProduct })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const getProductsNotVerified = async (req, res) => {
    try {
        const allProduct = await Product.find({ isVerified: false });
        return res.status(200).json({ status: "Success", data: allProduct })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const verifyProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findByIdAndUpdate(productId, { isVerified: true });
        // console.log(product)
        return res.status(200).json({ status: "Success", message: "Product is verified!" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
import User from "../modals/User.modal.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { name, role, email, password, confirmPassword } = req.body.userData;
        if (!name || !role || !email || !password || !confirmPassword) return res.status(404).json({ status: "error", message: "Fields are missing.." })
        if (password !== confirmPassword) return res.status(404).json({ status: "error", message: "Password and Confirm password not matched!" })

        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) {
            return res.status(404).json({ status: "error", message: "Email is present!" })
        }

        const codedPassword = await bcrypt.hash(password, 10);

        try {
            const user = new User({
                name, role, email, password: codedPassword
            })
            await user.save();
            return res.status(201).json({ status: "Success", message: "User created successfully." })
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message })
        }
        // console.log(name, role, email, password, confirmPassword, "- userdata in backend")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if (!email || !password) return res.status(404).json({ status: "error", message: "Fields are missing.." })

        const user = await User.findOne({ email }).select("_id email name role password")
        console.log(user, "user")

        if (!user) {
            return res.status(500).json({ status: "error", message: "Invalid email." })
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password);
        console.log(isPasswordValid, user, process.env.JWT_SECRET, "isPasswordValid")
        if (isPasswordValid) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            // jwt token
            const finalObject = {
                name: user?.name,
                email: user?.email,
                _id: user?._id,
                role: user?.role
            }
            console.log(token, "token")
            return res.status(200).json({ status: "Success", message: "Login Successfull.", data: finalObject, token: token })
        } else {
            return res.status(500).json({ status: "error", message: "Password is Wrong." })
        }

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}



export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({ status: "error", message: "Token is not found!" })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decodedData?.userId).select("_id email name role")
        if (user) {
            return res.status(200).json({ message: "Success", data: user })
        }

        return res.status(404).json({ status: "error", message: "USER is not found!" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
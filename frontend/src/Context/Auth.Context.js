import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

const InitialState = { user: null, product: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.paylaod }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}

// This is Higher order component - it accepts another component as a props
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, InitialState);

    const Login = (userData) => {
        // alert("Inside login function")
        // console.log(userData, "user data in context")
        localStorage.setItem("AccessToken", JSON.stringify(userData.token)) // Browser
        dispatch({
            type: "LOGIN",
            paylaod: userData.data
        }) // Over the application
    }

    const Logout = () => {
        localStorage.removeItem("AccessToken")// Browser
        dispatch({
            type: "LOGOUT"
        })// Over the application
        toast.success("Logged out Successfully.")
    }

    useEffect(() => {
        async function getCurrentUser() {
            // alert("inside tokenm")
            const response = await axios.post("http://localhost:8000/get-current-user", { token });
            // console.log(response, "response from backend")
            if (response?.data?.message == "Success") {
                dispatch({
                    type: "LOGIN",
                    paylaod: response?.data?.data
                }) // over the application we are storing the data again
            }
        }
        const token = JSON.parse(localStorage.getItem("AccessToken"));
        if (token) {
            getCurrentUser()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ Login, Logout, state }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
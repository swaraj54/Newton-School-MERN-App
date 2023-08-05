import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../Context/Auth.Context'

const Homepage = () => {

    const { state, Login } = useContext(AuthContext);
    console.log(state, "state in homepage")
    return (
        <div>
            <h1>Homepage </h1>
            <h1>Hello user - {state?.user?.name}</h1>
            <button onClick={() => toast.error("Hiiiiiii")}>Click to ser toast</button>
        </div>
    )
}

export default Homepage
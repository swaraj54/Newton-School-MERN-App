import React from 'react'
import { toast } from 'react-hot-toast'

const Homepage = () => {
    return (
        <div>Homepage <button onClick={() => toast.error("Hiiiiiii")}>Click to ser toast</button></div>
    )
}

export default Homepage
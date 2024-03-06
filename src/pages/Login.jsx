import React from 'react'
import LoginComponent from "../components/LoginComponent"

function Login() {
    return (
        <div className=' h-full flex justify-center items-center ' style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(255, 255, 255, 0.16)" }}>
            <LoginComponent />
        </div>
    )
}

export default Login

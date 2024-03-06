import React from 'react'
import SignUpComponent from '../components/SignUpComponent'

function Signup() {
    return (
        <div className=' h-full flex justify-center items-center ' style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(255, 255, 255, 0.16)" }}>
            <SignUpComponent />
        </div>
    )
}

export default Signup

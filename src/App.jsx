import React from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
function App() {
    return (
        <div className='bg-puro-400 ' style={{backgroundImage: "url('https://i.ytimg.com/vi/bdsE6f5f91o/maxresdefault.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"}}>
            <div className='h-screen max-w-[720px]  mx-auto border-2 border-gray-800'>
                <div className='h-[7%] border-b-2 border-black'>
                    <Header />
                </div>
                <main className=' h-[93%]'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default App;

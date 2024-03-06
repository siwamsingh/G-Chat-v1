import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './extra.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element:
                    <AuthLayout authentication>
                        <Home />
                    </AuthLayout>,
            },
            {
                path: "/login",
                element:
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>,
            },
            {
                path: "/signup",
                element:
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>,
            },
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)

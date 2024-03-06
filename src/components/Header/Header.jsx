import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout as authLogout } from '../../store/authSlice';

function Header() {
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.auth.status);//if true then logged in otherwise logged uot
    const userData = useSelector(state => state.auth.userData)

    const logout = async () => {
        try {
            await authService.logout();
            dispatch(authLogout());
        } catch (error) {
            console.log(error);
        }
    }
    return (
        < div className='h-full bg-cyan-900 w-full text-white' >
            {userStatus ? (
                <div >
                    <div className='flex justify-between px-4 pt-1'>
                        <div className='flex items-center text-xl'>👤  {userData.name} </div>
                        <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logut</button>
                    </div>
                </div >
            ) : (
                <div className=' h-full flex items-center'>
                    <div className='text-xl px-2 w-full  flex justify-end gap-3'>
                        <Link to="/login" className=' hover:text-blue-400'>
                            Login
                        </Link>

                        <Link to="/signup" className=' hover:text-blue-400'>
                            Sign up
                        </Link>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Header

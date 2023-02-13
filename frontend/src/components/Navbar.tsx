import Logo from '../icons/logo.svg'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout } from '../features/auth/AuthSlice';
import { AppDispatch, RootState } from '../app/store';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: RootState) => state.auth);
    //console.log(user);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <div className='flex flex-wrap bg-black p-6'>
            <Link to='/' className=''>
                <button className='flex fs-bold font-medium items-center text-white mb-4 md:mb-0'>
                    <img src={Logo} className='bg-white rounded-full w-15 h-20 py-6 px-1'/>
                    <span className='ml-3 text-3xl'>altmon</span>
                </button>
            </Link>
            <nav className='ml-auto mr-auto flex flex-wrap items-center justify-center fs-bold xl:text-xl md:text-base'>
                <Link to='/'>
                    <button className="mr-5 p-5 text-white hover:">
                        Home
                    </button>
                </Link>
                <Link to='/dashboard'>
                    <button className="mr-5 p-5 text-white">
                        Dashboard
                    </button>
                </Link>
            </nav>
            {user ? (
                <div className='inline-flex items-center text-white border-0 text-base fs-regular'>
                    <button className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded' onClick={onLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <> 
                <Link to='/login' className='inline-flex items-center text-white border-0 text-base fs-regular'>
                    <button className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded'>
                        Login
                    </button>
                </Link>
                <Link to='/register' className='inline-flex items-center text-white border-0 text-base fs-regular'>
                    <button className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded'>
                        Register
                    </button>
                </Link>
                </>)}
            
        </div>
    )
}
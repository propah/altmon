import Logo from '../icons/logo.svg'

import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='flex flex-wrap bg-black p-4'>
            <Link to='/' className=''>
                <button className='flex fs-bold font-medium items-center text-white mb-4 md:mb-0'>
                    <img src={Logo} className='bg-white rounded-full w-10 h-13 py-6 px-1'/>
                    <span className='ml-3 text-3xl'>altmon</span>
                </button>
            </Link>
            <nav className='ml-auto mr-auto flex flex-wrap items-center justify-center fs-regular xl:text-xl md:text-base'>
                <Link to='/'>
                    <button className="mr-5 p-5 text-white">
                        Home
                    </button>
                </Link>
                <Link to='/dashboard'>
                    <button className="mr-5 p-5 text-white">
                        Dashboard
                    </button>
                </Link>
            </nav>
            <Link to='/login' className='inline-flex items-center text-white border-0 text-base fs-bold'>
                <button className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded'>
                    Login
                </button>
            </Link>
            <Link to='/register' className='inline-flex items-center text-white border-0 text-base fs-regular'>
                <button className='focus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded'>
                    Register
                </button>
            </Link>
        </div>
    )
}
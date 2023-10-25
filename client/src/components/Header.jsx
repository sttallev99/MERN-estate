import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search/?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        if(searchTermFromURL) {
            setSearchTerm(searchTermFromURL);
        }
    }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center mx-auto p-4'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <Link to='/'>
                    <span className='text-slate-500'>Premium</span>
                    <span className='text-slate-700'>Estate</span>
                </Link>
            </h1>
            <form className='bg-slate-100 p-2 rounded-lg flex items-center' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64 cursor-pointer'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>
            <ul className='flex gap-4 cursor-pointer'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/messages'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Chat</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline  text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? (
                        <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover'/>
                    ) : (
                        <li className='text-slate-700 hover:underline'>Sign In</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}

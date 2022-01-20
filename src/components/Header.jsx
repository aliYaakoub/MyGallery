import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ProgressBar from './ProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {

    const [file, setFile] = useState(null);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    function handleUpload(e){
        if(currentUser){
            
        }
        else{
            navigate('/login')
        }
    }

    return (
        <div className='w-full header '>
            {currentUser && <span className='absolute cursor-pointer top-3 right-3' onClick={()=>logout()}>Logout</span>}
            <h1 className='text-center text-6xl py-5 header__title'>My Gallery</h1>
            {currentUser && <p className='text-sm font-light text-center'>Logged in as {currentUser.email}</p>}
            <div className='flex items-center justify-between my-5'>
                <Link to='/View-Mode' className='cursor-pointer'>Enter View Mode</Link>
                <label className='cursor-pointer relative' onClick={()=>handleUpload()}>
                    {currentUser && <input type="file" className='hidden' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />}
                    <AiOutlinePlusCircle size="40" />
                </label>
            </div>
            {file && <ProgressBar file={file} setFile={setFile} username={currentUser.email.split('@')[0]} />}
            <div>
            </div>
        </div>
    )
}

export default Header

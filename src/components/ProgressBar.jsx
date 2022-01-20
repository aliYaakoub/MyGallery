import React, { useEffect } from 'react'
import useStorage from '../firebase/useStorage'
import { motion } from 'framer-motion';

const ProgressBar = ({file, setFile, username}) => {

    const { url, progress } = useStorage(file, username);
    console.log(progress, url);
    
    useEffect(()=>{
        if(url){
            setFile(null);
        }
    },[url, setFile])

    return (
        <motion.div 
            className='w-full h-1 progressBar my-5' 
            initial={{width: 0}}
            animate={{width: progress + '%'}}
        ></motion.div>
    )
}

export default ProgressBar

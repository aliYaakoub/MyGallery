import React, { useState } from 'react'
import useFirestore from '../firebase/useFirestore'
import { motion } from 'framer-motion'
import { AiFillDelete } from 'react-icons/ai'
import { useAuth } from '../contexts/AuthContext'

const ImagesGrid = () => {

    const [featuredImg, setFeaturedImg] = useState('');
    const { docs, loading } = useFirestore('images', 'desc');

    const { currentUser, deletePost } = useAuth();

    return (
        <div className='py-5 image-grid'>
            {loading ?
                <h1 className='text-center w-full text-xl'>loading</h1>
                :
                <div>
                    {featuredImg && 
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className='bg-opacity-90 fixed p-5 z-50 top-0 h-screen w-screen flex justify-center items-center left-0 bg-black'>
                            <motion.p
                                initial={{y: '-100vh'}}
                                animate={{y: '0vh'}} 
                                transition={{delay: 1}}
                                onClick={()=>setFeaturedImg('')}
                                className='text-white py-1 px-4 bg-gray-700 w-28 rounded-xl fixed top-5 text-center cursor-pointer'
                            >
                                Back
                            </motion.p>
                            <img className=' max-h-full ring-1 ring-gray-700 rounded-lg' src={featuredImg} alt="" />
                        </motion.div>
                    }
                    {docs.length === 0 ? 
                        <p className='text-center font-light'>no images to show</p>
                        :
                        <motion.div className='columns-3'>
                            {/* {docs.map(doc => (
                                <motion.div layout initial={{opacity: 0}} animate={{opacity: 1}} className=" relative">
                                    {currentUser && doc.username === currentUser.email.split('@')[0] && <span onClick={()=>deletePost(doc.id, doc.fileName)} className='text-red-500 absolute top-2 right-2 z-10'><AiFillDelete size='20' /></span>}
                                    <img onClick={()=>setFeaturedImg(doc.file)} className='' src={doc.file} alt={doc.fileName} />
                                </motion.div>
                            ))} */}
                            {docs.map(doc => (
                                <div className='bg-gray-700 relative'>
                                    {currentUser && doc.username === currentUser.email.split('@')[0] && <span onClick={()=>deletePost(doc.id, doc.fileName)} className='text-red-500 absolute top-2 right-2 z-10 cursor-pointer'><AiFillDelete size='20' /></span>}
                                    <img onClick={()=>setFeaturedImg(doc.file)} className='mb-4 image bg-gray-700' src={doc.file} alt={doc.fileName} />
                                </div>
                            ))}
                        </motion.div>
                    }
                </div>
                }
        </div>
    )
}

export default ImagesGrid;
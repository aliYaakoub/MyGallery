import React, { useState } from 'react'
import useFirestore from '../firebase/useFirestore';
import { Link } from 'react-router-dom';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { BiExit } from 'react-icons/bi'

const Slider = () => {

    const [index, setIndex] = useState(0);

    const { docs, loading } = useFirestore('images', 'desc');

    function handleNext(){
        if(index === docs.length -1){
            return setIndex(0);
        }
        setIndex(index+1)
    }

    function handlePrev(){
        if(index === 0){
            return setIndex(docs.length - 1)
        }
        setIndex(index-1)
    }

    return (
        <div className='bg-opacity-80 fixed top-0 h-screen w-screen left-0 bg-black'>
            {loading ? 
                <div className='h-full w-full flex items-center justify-center'>
                    <p>Loading</p>
                </div>
                :
                <React.Fragment>
                    <div className="relative">
                        {docs.map((image, ind)=>(
                            <div className='h-screen w-screen p-5 absolute top-0 flex justify-center items-center'>
                                <img
                                    alt=''
                                    key={image.id}
                                    src={image.file}
                                    className={ind === index ?
                                        'max-h-full rounded-lg viewMode-img active-img'
                                        :
                                        'viewMode-img max-h-full rounded-lg'
                                    }
                                />
                            </div>
                        ))}
                        <span className='absolute top-5 right-5 flex items-center'>
                            <Link to='/'><BiExit size='30' /></Link>
                        </span>
                    </div>
                    <span
                        onClick={()=>handlePrev()}
                        className='absolute top-2/4 transform -translate-y-2/4 left-0 cursor-pointer'
                    >
                        <BsFillArrowLeftCircleFill size='50' />
                    </span>
                    <span
                        onClick={()=>handleNext()}
                        className='absolute top-2/4 transform -translate-y-2/4 right-0 cursor-pointer'
                    >
                        <BsFillArrowRightCircleFill size='50' />
                    </span>
                </React.Fragment>
            }
        </div>
    )
}

export default Slider
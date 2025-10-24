import React, { useEffect, useEffectEvent, useState } from 'react'
import NavLink from '../navigation/NavLink'
import SearchBar from '../navigation/SearchBar'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAccessToken, selectCurrentUser } from '../../../features/authSlice'
import { FaBars, FaRegComment, FaRegHeart, FaSearch, FaTimes } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'

const Header = ({handleChange, handleSubmit, setSidebarProfile, sidebarProfile, sidebarMobile, setSidebarMobile, search}) => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [favorite, setFavorite] = useState(false)
    const [chat, setChat] = useState(false)
    const [searchMobile, setSearchMobile] = useState(false)
    const [iconSearch, setIconSearch] = useState(true)
    const [order, setOrder] = useState(false)

    useEffect(() => {
        if(!token){
            setSidebarProfile(false)
        }
    },[token])

    useEffect(() => {
        if(sidebarMobile){
            setSidebarMobile(false)
        }
    },[location.pathname])
  return (
    <>
        <div className='xl:h-[80px] lg:h-[72px] md:h-[64px] sm:h-[56px] h-[48px] w-full flex sm:justify-center justify-between xl:gap-[35px] lg:gap-[27px] md:gap-[19px] sm:gap-[10px] gap-[2px] items-center xl:px-[150px] lg:px-[100px] md:px-[40px] px-[25px] sticky top-0 bg-white z-200'>
            {token && (
                <button 
                    className='sm:hidden block cursor-pointer'
                    onClick={() => setSidebarMobile(!sidebarMobile)}
                >   
                    {!sidebarMobile ? 
                    <FaBars 
                        className='text-gray-500'
                        onClick={() => setIconSearch(false)}
                    /> : 
                    <FaTimes 
                        className='text-gray-500'
                        onClick={() => setIconSearch(true)}
                    />}
                </button>
            )}
            <div className='h-full flex items-center justify-center lg:pr-[125px] md:pr-[80px] sm:pr-[10px] sm:w-fit w-full'>
                <NavLink link='/' text='PanggilAja' className='md:text-h4 text-h5 text-secondary font-bold' onClick={() => {
                    setSidebarMobile(false)
                    setSidebarProfile(false)
                    setIconSearch(true)
                }}/>
            </div>
            <div className='sm:w-full flex items-center gap-0 sm:gap-[5px]'>
                <form className='overflow-hidden w-full sm:flex sm:items-center h-[43px] relative hidden' onSubmit={handleSubmit}>
                    <Input 
                        placeholder='Cari jasa sekarang' 
                        className='h-full text-left md:indent-3 md:placeholder:text-h5 placeholder:text-h6 lg:px-[50px] px-[10px] border-2 border-gray-100 rounded-[25px] text-gray-600 md:text-h5 text-h6' 
                        onChange={handleChange} onFocus={() => {
                            setSidebarMobile(false)
                            setSidebarProfile(false)
                        }}
                        value={search}    
                    />
                    <Button className='rounded-bl-[25px] rounded-tl-[25px] items-center justify-center h-[35px] md:h-[43px] md:block hidden absolute left-0 lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]' variant='primary'><FaSearch size={10} color='white'/></Button>
                </form>
                <NavLink text='Jadi Mitra' className='text-h6 md:text-h5 w-[85px] md:w-[105px] font-light text-center sm:block hidden' link='/partner'/>
            </div>
            <div className='flex gap-[10px] md:gap-[15px] items-center h-full relative lg:w-[300px] justify-end' on>
                {!token ? (
                    <>
                        <NavLink link='/login' className='text-h6 md:text-h5 lg:text-h4 text-secondary font-bold' text='Masuk'/>
                        <Link to='/register'>
                            <Button className='h-[30px] w-[65px] sm:h-[35px] sm:w-[70px] md:h-[40px] md:w-[100px] lg:h-[45px] lg:w-[130px] text-white lg:text-h4 md:text-h5 text-h6 rounded-[25px] font-bold flex justify-center items-center' variant='primary'>Daftar</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <img 
                            className='w-[40px] h-[40px] bg-amber-100 rounded-full sm:block hidden cursor-pointer'
                            onClick={() => {
                                setSidebarProfile(!sidebarProfile)
                                setFavorite(false)
                                setChat(false)
                            }}
                        ></img>
                        {iconSearch && (
                            <button 
                                className='sm:hidden block cursor-pointer'
                                onClick={() => setSearchMobile(!searchMobile)}
                            >   
                                <MdSearch className='text-gray-80000 text-[20px]'/>
                            </button>
                        )}
                    </>
                )}
            </div>
            {searchMobile && (
                <div className='bg-white fixed top-0 bottom-0 right-0 left-0 px-[25px] py-[10px] sm:hidden'>
                    <div className='flex gap-[15px] items-center'>
                        <form className='w-full' onSubmit={handleSubmit}>
                            <Input 
                                placeholder='Cari jasa terdekat' 
                                className='bg-white rounded-[15px] shadow-sm'
                                onChange={handleChange} onFocus={() => {
                                    setSidebarMobile(false)
                                    setSidebarProfile(false)
                                }}
                                value={search}    
                            />
                        </form>
                            
                        <p
                            onClick={() => setSearchMobile(false)}
                            className='cursor-pointer text-secondary'
                        >
                            Close
                        </p>
                    </div>
                </div>
            )}
            {sidebarProfile && (
                <div className='sm:absolute sm:flex justify-end hidden xl:right-[150px] lg:right-[100px] md:right-[40px] right-[25px] lg:top-[80px] md:top-[70px] top-[65px] gap-[5px]'>
                    {favorite && (
                        <div className='w-[200px] h-[300px] bg-white rounded-[15px] px-[15px] py-[10px] shadow-xl border-2 border-gray-100'>
                            <p className='text-h6 border-b-1 border-gray-100 py-[5px]'>Jasa Favorit</p>
                        </div>
                    )}
                    {chat && (
                        <div className='w-[400px] h-[300px] bg-white rounded-[15px] shadow-xl border-2 border-gray-100 overflow-auto'>
                            <div className='border-t-1 border-b-1 border-gray-100 px-[10px] py-[15px] flex flex-col gap-[5px]'>
                                <p className='text-h6'>asep</p>
                                <div className='flex gap-[10px]'>
                                    <div className=''>
                                        <img src="" alt="" className='w-[40px] h-[40px] rounded-full bg-amber-100'/>
                                    </div>
                                    <div className='w-full flex items-center'>
                                        <p className='text-h6 font-light'>{'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, dicta porro. Et quod aperiam assumenda! Ut minima, odit ab quo, voluptas consequatur autem tempore accusantium, ipsa expedita qui laboriosam aperiam.'.substring(0, 100)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {order && (
                        <div className='w-[400px] h-[300px] bg-white rounded-[15px] shadow-xl border-2 border-gray-100 overflow-auto'>
                            <div className='border-t-1 border-b-1 border-gray-100 px-[10px] py-[15px] flex flex-col gap-[5px]'>
                                <p className='text-h6'>asep</p>
                                <div className='flex gap-[10px]'>
                                    <div className=''>
                                        <img src="" alt="" className='w-[40px] h-[40px] rounded-full bg-amber-100'/>
                                    </div>
                                    <div className='w-full flex items-center'>
                                        <p className='text-h6 font-light'>{'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, dicta porro. Et quod aperiam assumenda! Ut minima, odit ab quo, voluptas consequatur autem tempore accusantium, ipsa expedita qui laboriosam aperiam.'.substring(0, 100)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='shadow-xl w-[200px] z-50 bg-white border-2 border-gray-100 gap-[10px] rounded-[15px] overflow-hidden h-[300px] relative'>
                        <Link to='profile-setting'>
                            <div className='flex gap-[10px] px-[20px] py-[15px] hover:bg-gray-50'>
                                <div className='w-[40px] h-[40px] bg-amber-100 rounded-full'></div>
                                <div>
                                    <p>{token && user.username}</p>
                                    <p className='text-h6 font-light'>Konsumen</p>
                                </div>
                            </div>
                        </Link>
                        <div className=''>
                            <div 
                                className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-gray-50 cursor-pointer'
                                onClick={() => {
                                    setFavorite(!favorite)
                                    setChat(false)
                                    setOrder(false)
                                }}
                            >
                                <FaRegHeart className='text-gray-400 text-[15px]'/>
                                <p className='text-h6'>Favorit</p>
                            </div>
                            <div 
                                className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-gray-50 cursor-pointer'
                                onClick={() => {
                                    setFavorite(false)
                                    setChat(false)
                                    setOrder(!order)
                                }}
                            >
                                <FaRegHeart className='text-gray-400 text-[15px]'/>
                                <p className='text-h6'>Pesanan</p>
                            </div>
                        </div>  
                        <div className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-primary hover:text-white cursor-pointer mt-auto group' onClick={() => dispatch(logout())}>
                            <IoMdLogOut className='text-gray-400 text-[15px] group-hover:text-white'/>
                            <p className='text-h6'>Logout</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {sidebarMobile && (
            <div 
                className='sm:w-0 sm:h-0 fixed w-full min-h-screen bg-white z-100 flex flex-col px-[15px] transition duration-500 sm:hidden'>
                <Link 
                    to='profile-setting'
                    onClick={() => {
                        setSidebarMobile(false)
                        setIconSearch(true)
                    }}
                >
                    <div 
                        className='flex items-center my-[15px] gap-[15px] px-[15px] py-[10px] hover:bg-gray-50 cursor-pointer w-full'
                    >
                        <div className='w-[40px] h-[40px] bg-amber-100 rounded-full'></div>
                        <div>
                            <p>{token && user.username}</p>
                            <p className='text-h6 font-light'>Konsumen</p>
                        </div>   
                    </div>
                </Link>
                <div>
                    <Link to='/chat'>
                        <div 
                            className='flex gap-[15px] items-center px-[15px] py-[15px] hover:bg-gray-50 cursor-pointer'
                            onClick={() => {
                                setChat(!chat)
                                setFavorite(false)
                                setIconSearch(true)
                            }}
                        >
                            <FaRegComment className='text-gray-400 text-[20px]'/>
                            <p className='text-h5'>Pesan</p>
                        </div>
                    </Link>
                    <Link to='/favorite'>
                        <div 
                            className='flex gap-[15px] items-center px-[15px] py-[15px] hover:bg-gray-50 cursor-pointer'
                            onClick={() => {
                                setFavorite(!favorite)
                                setChat(false)
                                setIconSearch(true)
                            }}
                        >
                            <FaRegHeart className='text-gray-400 text-[20px]'/>
                            <p className='text-h5'>Favorit</p>
                        </div>
                    </Link>
                </div>
                
                <Button
                    className='cursor-pointer text-white py-[15px] rounded-[35px] hover:bg-primary/90'
                    variant='primary'
                    onClick={() => {
                        dispatch(logout())
                        setSidebarMobile(false)
                    }}
                >
                    Logout
                </Button>
            </div>
        )}
    </>
  )
}

export default Header
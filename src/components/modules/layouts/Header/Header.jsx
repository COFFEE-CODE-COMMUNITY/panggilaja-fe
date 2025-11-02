import React, { useEffect, useState } from 'react'
import NavLink from '../../navigation/NavLink'
import Input from '../../../common/Input'
import Button from '../../../common/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeAccount, logout, logoutUser, resetChangeAccountStatus, selectAccessToken, selectChangeAccountStatus, selectCurrentUser } from '../../../../features/authSlice'
import { FaBars, FaRegComment, FaRegHeart, FaSearch, FaTimes, FaUser } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'
import { getFavoriteService, getServices, selectAllService, selectFavoriteService, selectFavoriteServiceStatus } from '../../../../features/serviceSlice'
import { seeProfile, selectSeeProfile, selectSeeProfileStatus } from '../../../../features/userSlice'

const Header = ({handleChange, handleSubmit, setSidebarProfile, sidebarProfile, sidebarMobile, setSidebarMobile, search}) => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectAccessToken)

    const profile = useSelector(selectSeeProfile)
    const statusProfile = useSelector(selectSeeProfileStatus)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const favorites = useSelector(selectFavoriteService)
    const favoritesStatus = useSelector(selectFavoriteServiceStatus)
    const services = useSelector(selectAllService)

    const [favorite, setFavorite] = useState(false)
    const [chat, setChat] = useState(false)
    const [searchMobile, setSearchMobile] = useState(false)
    const [iconSearch, setIconSearch] = useState(true)
    const [order, setOrder] = useState(false)

    useEffect(() => {
        if (user?.id_buyer && statusProfile === 'idle' && !profile) {
            dispatch(seeProfile(user.id_buyer))
        }
    },[statusProfile, dispatch, user?.id_buyer])

    useEffect(() => {
        if (!token) {
            setSidebarProfile(false);
        } 
        
        // Periksa token dan user ID sebelum memanggil getFavoriteService
        if (token && user?.id) { 
            dispatch(getFavoriteService(user.id)); // Panggil dengan ID yang sudah pasti ada
        }
        
        // getServices dipanggil secara terpisah karena tidak bergantung pada user
        dispatch(getServices()); 

    }, [token, user?.id, dispatch]);

    useEffect(() => {
        if(sidebarMobile){
            setSidebarMobile(false)
        }
    },[location.pathname])

    const statusChange = useSelector(selectChangeAccountStatus)
    
    if (statusChange === 'loading') {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Memuat data...</p>
                </div>
            </div>
        )
    }

    if(statusChange === 'success'){
        dispatch(resetChangeAccountStatus())
        navigate('/dashboard')
    }

    let favoritesService = [];

    if (favoritesStatus === 'success' && favorites.data && services.length > 0) {
        // 1. Dapatkan semua ID service yang difavoritkan
        const favoritedServiceIds = favorites.data.map(fav => fav.service_id);
        
        // 2. Filter list services utama menggunakan set ID
        favoritesService = services.filter(service => 
            favoritedServiceIds.includes(service.id)
        );
    }

    const haveSellerAccount = user?.available_roles.length > 1    

    console.log(favoritesService)
    return (
        <>
            <div className='md:py-[15px] py-[10px] w-full flex sm:justify-center justify-between xl:gap-[35px] lg:gap-[27px] md:gap-[19px] sm:gap-[10px] gap-[2px] items-center xl:px-[150px] lg:px-[100px] md:px-[40px] px-[25px] sticky top-0 bg-white z-200 border-b-2 border-gray-100'>
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
                            className='h-full text-left md:indent-3 md:placeholder:text-h5 placeholder:text-h6 lg:px-[50px] md:px-[35px]  border-2 border-gray-100 rounded-[25px] text-gray-600 md:text-h5 text-h6' 
                            onChange={handleChange} onFocus={() => {
                                setSidebarMobile(false)
                                setSidebarProfile(false)
                            }}
                            value={search}    
                        />
                        <Button className='rounded-bl-[25px] rounded-tl-[25px] items-center justify-center h-[35px] md:h-[43px] md:block hidden absolute left-0 lg:px-[20px] lg:py-[15px] md:px-[15px] md:py-[10px] px-[10px] py-[5px]' variant='primary'><FaSearch size={10} color='white'/></Button>
                    </form>
                    {!haveSellerAccount && (
                        <NavLink text='Jadi Mitra' className='text-h6 md:text-h5 w-[85px] md:w-[105px] font-light text-center sm:block hidden' link='/partner'/>
                    )}
                    {location.pathname === '/partner' && (
                        <NavLink text='Jadi Mitra' className='text-h6 md:text-h5 w-[85px] md:w-[105px] font-light text-center sm:block hidden' link='/partner'/>
                    )}
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
                                src={profile?.foto_buyer}
                                onClick={() => {
                                    setSidebarProfile(!sidebarProfile)
                                    setFavorite(false)
                                    setChat(false)
                                    setOrder(false)
                                }}
                            ></img>
                            <button 
                                className='sm:hidden block cursor-pointer w-[20px] h-[20px] '
                                onClick={() => setSearchMobile(!searchMobile)}
                            >   
                                {iconSearch && (
                                    <MdSearch className='text-gray-400 text-[20px]'/>
                                )}
                            </button>
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
                            <div className='w-[400px] h-[300px] bg-white rounded-[15px] px-[10px] py-[5px] shadow-xl border-2 border-gray-100 overflow-auto'>
                                <p className='text-h6 border-b-1 border-gray-100 py-[5px]'>Jasa Favorit</p>
                                <div>
                                    {favoritesService.map((favorite) => (
                                        <Link to={`service/${favorite.id}`}>
                                            <div className='flex gap-[20px] hover:bg-gray-50 px-[10px] py-[5px]'>
                                                <img src={favorite?.foto_product} className='w-[100px]'></img>
                                                <p className='w-full text-h6'>{favorite.nama_jasa}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
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
                                    <img src={profile?.foto_buyer} className='w-[40px] h-[40px] bg-amber-100 rounded-full'></img>
                                    <div>
                                        <p>{token && user?.username}</p>
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
                                <Link to='/chat'>
                                    <div className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-gray-50 cursor-pointer'>
                                        <FaRegComment className='text-gray-400 text-[15px]'/>
                                        <p className='text-h6'>Chat</p>
                                    </div>
                                </Link>
                                <div 
                                    className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-gray-50 cursor-pointer'
                                    onClick={() => {
                                        dispatch(changeAccount({targetRole : 'seller'}))
                                    }}
                                >
                                    <FaUser className='text-gray-400 text-[15px]'/>
                                    <p className='text-h6'>Ganti Akun Seller</p>
                                </div>
                            </div>  
                            <div className='flex gap-[10px] items-center px-[15px] py-[10px] hover:bg-primary hover:text-white cursor-pointer mt-auto group' onClick={() => dispatch(logoutUser())}>
                                <IoMdLogOut className='text-gray-400 text-[15px] group-hover:text-white'/>
                                <p className='text-h6'>Logout</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {sidebarMobile && (
                <div 
                    className='sm:w-0 sm:h-0 fixed w-full h-screen bg-white z-100 flex flex-col px-[15px] transition duration-500 sm:hidden py-[15px]'>
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
                            <img src={profile?.foto_buyer} className='w-[40px] h-[40px] bg-amber-100 rounded-full'></img>
                            <div>
                                <p>{token && user?.username}</p>
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
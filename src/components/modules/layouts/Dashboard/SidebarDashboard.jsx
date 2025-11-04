import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { 
    changeAccount, 
    logout,
    resetChangeAccountStatus, 
    selectChangeAccountMessage, 
    selectChangeAccountStatus, 
    selectCurrentUser 
} from "../../../../features/authSlice";
import { getSellerById, selectSelectedSeller } from "../../../../features/sellerSlice";


export const SidebarDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectCurrentUser)
    const sellerProfile = useSelector(selectSelectedSeller)
    const statusChange = useSelector(selectChangeAccountStatus)

    const [profileSeller, setProfileSeller] = useState(false)

    const handleSwitchToBuyer = () => {
        dispatch(changeAccount({ targetRole: "buyer" }))
    }

    if (statusChange === 'loading') {
        return (
            <div className='z-100 bg-white flex justify-center items-center min-h-screen fixed w-full'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Memuat data...</p>
                </div>
            </div>
        )
    }

    // Logic useEffect yang sudah ada
    useEffect(() => {
        if(user && user.id_seller){
            dispatch(getSellerById(user.id_seller))
        }
    },[dispatch, user?.id_seller])

    useEffect(() => {
        if(statusChange === 'success'){
            dispatch(resetChangeAccountStatus())
            navigate('/') // Arahkan ke halaman utama buyer/landing page setelah switch
        }
    },[statusChange, dispatch, navigate])

    return (
        <aside className="bg-white px-10 py-5 flex flex-col justify-between h-screen fixed w-70">
          <div>
            {/* Logo */}
            <div>
              <h1 className="text-primary text-h3 font-semibold">PanggilAja Seller</h1>
            </div>
    
            <nav className="md:mt-7 mt-5">
              <ul className="space-y-3 border-b border-gray-200 pb-3">
                <li>
                  <NavLink  
                    to='manage-services'
                    className={({ isActive }) => 
                      `group flex items-center px-3 py-2 text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                      ${isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-500 hover:bg-primary hover:text-white'
                      }`
                    }
                    end={false}
                  >
                    <span className="flex items-center">
                      <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16.8945V7.6507C20.9993 7.51718 20.9634 7.38621 20.8959 7.27099C20.8284 7.15577 20.7317 7.06039 20.6156 6.99445L12.3656 2.35383C12.2545 2.28965 12.1284 2.25586 12 2.25586C11.8716 2.25586 11.7455 2.28965 11.6344 2.35383L3.38437 6.99445C3.26827 7.06039 3.1716 7.15577 3.10411 7.27099C3.03663 7.38621 3.00072 7.51718 3 7.6507V16.8945C3.00072 17.028 3.03663 17.1589 3.10411 17.2742C3.1716 17.3894 3.26827 17.4848 3.38437 17.5507L11.6344 22.1913C11.7455 22.2555 11.8716 22.2893 12 22.2893C12.1284 22.2893 12.2545 22.2555 12.3656 22.1913L20.6156 17.5507C20.7317 17.4848 20.8284 17.3894 20.8959 17.2742C20.9634 17.1589 20.9993 17.028 21 16.8945V16.8945Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.5938 14.5693V9.69434L7.5 4.67871" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.8953 7.2666L12.0828 12.2729L3.10156 7.2666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.0844 12.2725L12 22.285" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Produk
                    </span>
                  </NavLink>
                </li>
    
                <li>
                  <NavLink 
                    to='.'
                    className={({ isActive }) => 
                      `group flex items-center px-3 py-2 text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                      ${isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-500 hover:bg-primary hover:text-white'
                      }`
                    }
                    end={true}
                  >
                    <span className="flex items-center">
                      <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 4.77246H3C2.58579 4.77246 2.25 5.14556 2.25 5.60579V18.9391C2.25 19.3994 2.58579 19.7725 3 19.7725H21C21.4142 19.7725 21.75 19.3994 21.75 18.9391V5.60579C21.75 5.14556 21.4142 4.77246 21 4.77246Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.75 16.0225H18.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.25 16.0225H12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.25 9.35645H21.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Pesanan
                    </span>
                  </NavLink>
                </li>
              </ul>
              <ul className="space-y-3 pt-3">
                <li className="group flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-primary justify-between hover:text-white rounded-lg">
                  <span className="flex items-center">
                    <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Profile Seller
                  </span>
		            </li>
                <li className="group flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-primary justify-between hover:text-white rounded-lg">
                  <span className="flex items-center">
                    <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5.52246H21V18.2725C21 18.4714 20.921 18.6621 20.7803 18.8028C20.6397 18.9434 20.4489 19.0225 20.25 19.0225H3.75C3.55109 19.0225 3.36032 18.9434 3.21967 18.8028C3.07902 18.6621 3 18.4714 3 18.2725V5.52246Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M21 5.52246L12 13.7725L3 5.52246" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Inbox
                  </span>
                  <div className="bg-gray-300 h-5 w-5 text-gray-500 rounded-full flex justify-center items-center text-xs">
                    3
                  </div>
                </li>
    
                <li>
                  <div className="group flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-primary hover:text-white rounded-lg justify-between cursor-pointer">
                    <span className="flex items-center">
                      <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.27001 10.0226C5.26876 9.13342 5.44344 8.25281 5.78398 7.43147C6.12451 6.61012 6.62418 5.86426 7.25421 5.23685C7.88424 4.60943 8.63217 4.11287 9.45493 3.77575C10.2777 3.43863 11.159 3.26762 12.0481 3.27257C15.7606 3.30069 18.7325 6.38507 18.7325 10.1069V10.7726C18.7325 14.1288 19.4356 16.0788 20.0544 17.1476C20.1201 17.2614 20.1548 17.3905 20.1549 17.5219C20.155 17.6533 20.1206 17.7825 20.0551 17.8964C19.9895 18.0104 19.8952 18.1051 19.7816 18.1711C19.6679 18.2371 19.5389 18.2721 19.4075 18.2726H4.59501C4.46359 18.2721 4.33459 18.2371 4.22094 18.1711C4.10729 18.1051 4.01299 18.0104 3.94748 17.8964C3.88196 17.7825 3.84754 17.6533 3.84766 17.5219C3.84777 17.3905 3.88242 17.2614 3.94814 17.1476C4.56689 16.0788 5.27001 14.1288 5.27001 10.7726V10.0226Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 18.2725V19.0225C9 19.8181 9.31607 20.5812 9.87868 21.1438C10.4413 21.7064 11.2044 22.0225 12 22.0225C12.7956 22.0225 13.5587 21.7064 14.1213 21.1438C14.6839 20.5812 15 19.8181 15 19.0225V18.2725" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Notification
                    </span>
    
                    <div className="bg-gray-300 h-5 w-5 text-gray-500 rounded-full flex justify-center items-center text-xs">
                      3
                    </div>
                  </div>
                </li>
    
                <li>
                  <div className="group flex items-center px-3 py-2 text-sm text-gray-500 hover:bg-primary hover:text-white rounded-lg justify-between cursor-pointer">
                    <span className="flex items-center">
                      <svg className="mr-3 stroke-gray-500 group-hover:stroke-white" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.2565 16.8658C3.13983 14.9818 2.74924 12.755 3.15804 10.6034C3.56684 8.45187 4.74693 6.5235 6.47677 5.18035C8.2066 3.8372 10.3672 3.17165 12.553 3.30863C14.7388 3.44561 16.7994 4.37571 18.348 5.92432C19.8966 7.47293 20.8267 9.53354 20.9637 11.7193C21.1007 13.9051 20.4351 16.0657 19.0919 17.7955C17.7488 19.5254 15.8204 20.7055 13.6689 21.1143C11.5173 21.5231 9.29049 21.1325 7.4065 20.0158L4.294 20.897C4.16648 20.9343 4.03128 20.9366 3.90256 20.9037C3.77384 20.8708 3.65635 20.8038 3.5624 20.7099C3.46845 20.616 3.4015 20.4985 3.36858 20.3697C3.33565 20.241 3.33796 20.1058 3.37525 19.9783L4.2565 16.8658Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 13.3975C12.6213 13.3975 13.125 12.8938 13.125 12.2725C13.125 11.6511 12.6213 11.1475 12 11.1475C11.3787 11.1475 10.875 11.6511 10.875 12.2725C10.875 12.8938 11.3787 13.3975 12 13.3975Z" fill="currentColor" />
                        <path d="M7.5 13.3975C8.12132 13.3975 8.625 12.8938 8.625 12.2725C8.625 11.6511 8.12132 11.1475 7.5 11.1475C6.87868 11.1475 6.375 11.6511 6.375 12.2725C6.375 12.8938 6.87868 13.3975 7.5 13.3975Z" fill="currentColor" />
                        <path d="M16.5 13.3975C17.1213 13.3975 17.625 12.8938 17.625 12.2725C17.625 11.6511 17.1213 11.1475 16.5 11.1475C15.8787 11.1475 15.375 11.6511 15.375 12.2725C15.375 12.8938 15.8787 13.3975 16.5 13.3975Z" fill="currentColor" />
                      </svg>
                      Comments
                    </span>
                    <div className="bg-gray-300 h-5 w-5 text-gray-500 rounded-full flex justify-center items-center text-xs">
                      3
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
    
          <div className="flex flex-col gap-10">
            <div>
              <div className="group flex items-center pr-3 py-2 text-sm text-gray-500 rounded-lg justify-between cursor-pointer">
                <span className="flex items-center">
                  <img className="mr-3 w-10 h-10 object-cover rounded-full" src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844" alt="" />
                  <p className="flex flex-col">
                    <span className="text-sm text-black font-bold">
                      Aubrey Hepburn
                    </span>
                    <span className="text-sm ">Project Manager</span>
                  </p>
                </span>
                <svg className="hover:stroke-white rotate-90" width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.91797 9.27246L6.35087 5.27246L1.91797 1.27246" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <ul className="ml-12 mt-2 space-y-3 hidden">
                <li className="text-gray-500 text-sm cursor-pointer">
                  Project Manager
                </li>
                <li className="text-gray-500 text-sm cursor-pointer">
                  Project Manager
                </li>
                <li className="text-gray-500 text-sm cursor-pointer">
                  Project Manager
                </li>
              </ul>
            </div>
          </div>
        </aside>
    );
};
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { changeAccount, selectCurrentUser } from '../../../../features/authSlice';
import { deleteSellerById, selectSelectedSeller } from '../../../../features/sellerSlice';
import Button from '../../../common/Button';

const BottombarDashboard = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const sellerProfile = useSelector(selectSelectedSeller);

    const [modal, setModal] = useState(false)
  return (
    <div className='fixed bottom-0 md:hidden w-full py-2 bg-white'>
      <ul className='flex justify-evenly items-center'>
        <li>
          <NavLink
            to="manage-order"
            className={({ isActive }) =>
              `group flex items-center text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-primary"
                  }`
            }
          >
            <span className="flex flex-col items-center">
              <svg
                className="stroke-gray-500 group-hover:stroke-white"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 4.77246H3C2.58579 4.77246 2.25 5.14556 2.25 5.60579V18.9391C2.25 19.3994 2.58579 19.7725 3 19.7725H21C21.4142 19.7725 21.75 19.3994 21.75 18.9391V5.60579C21.75 5.14556 21.4142 4.77246 21 4.77246Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.75 16.0225H18.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 16.0225H12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.25 9.35645H21.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Pesanan
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="manage-services"
            className={({ isActive }) =>
              `group flex items-center text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-primary"
                  }`
            }
          >
            <span className="flex flex-col items-center">
              <svg
                className="stroke-gray-500 group-hover:stroke-white"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 16.8945V7.6507C20.9993 7.51718 20.9634 7.38621 20.8959 7.27099C20.8284 7.15577 20.7317 7.06039 20.6156 6.99445L12.3656 2.35383C12.2545 2.28965 12.1284 2.25586 12 2.25586C11.8716 2.25586 11.7455 2.28965 11.6344 2.35383L3.38437 6.99445C3.26827 7.06039 3.1716 7.15577 3.10411 7.27099C3.03663 7.38621 3.00072 7.51718 3 7.6507V16.8945C3.00072 17.028 3.03663 17.1589 3.10411 17.2742C3.1716 17.3894 3.26827 17.4848 3.38437 17.5507L11.6344 22.1913C11.7455 22.2555 11.8716 22.2893 12 22.2893C12.1284 22.2893 12.2545 22.2555 12.3656 22.1913L20.6156 17.5507C20.7317 17.4848 20.8284 17.3894 20.8959 17.2742C20.9634 17.1589 20.9993 17.028 21 16.8945V16.8945Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5938 14.5693V9.69434L7.5 4.67871"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.8953 7.2666L12.0828 12.2729L3.10156 7.2666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0844 12.2725L12 22.285"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Produk
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"chat"}
            className={({ isActive }) =>
              `group flex items-center text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-primary"
                  }`
            }
          >
            <span className="flex flex-col items-center">
              <svg
                className="stroke-gray-500 group-hover:stroke-white"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.2565 16.8658C3.13983 14.9818 2.74924 12.755 3.15804 10.6034C3.56684 8.45187 4.74693 6.5235 6.47677 5.18035C8.2066 3.8372 10.3672 3.17165 12.553 3.30863C14.7388 3.44561 16.7994 4.37571 18.348 5.92432C19.8966 7.47293 20.8267 9.53354 20.9637 11.7193C21.1007 13.9051 20.4351 16.0657 19.0919 17.7955C17.7488 19.5254 15.8204 20.7055 13.6689 21.1143C11.5173 21.5231 9.29049 21.1325 7.4065 20.0158L4.294 20.897C4.16648 20.9343 4.03128 20.9366 3.90256 20.9037C3.77384 20.8708 3.65635 20.8038 3.5624 20.7099C3.46845 20.616 3.4015 20.4985 3.36858 20.3697C3.33565 20.241 3.33796 20.1058 3.37525 19.9783L4.2565 16.8658Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13.3975C12.6213 13.3975 13.125 12.8938 13.125 12.2725C13.125 11.6511 12.6213 11.1475 12 11.1475C11.3787 11.1475 10.875 11.6511 10.875 12.2725C10.875 12.8938 11.3787 13.3975 12 13.3975Z"
                  fill="currentColor"
                />
                <path
                  d="M7.5 13.3975C8.12132 13.3975 8.625 12.8938 8.625 12.2725C8.625 11.6511 8.12132 11.1475 7.5 11.1475C6.87868 11.1475 6.375 11.6511 6.375 12.2725C6.375 12.8938 6.87868 13.3975 7.5 13.3975Z"
                  fill="currentColor"
                />
                <path
                  d="M16.5 13.3975C17.1213 13.3975 17.625 12.8938 17.625 12.2725C17.625 11.6511 17.1213 11.1475 16.5 11.1475C15.8787 11.1475 15.375 11.6511 15.375 12.2725C15.375 12.8938 15.8787 13.3975 16.5 13.3975Z"
                  fill="currentColor"
                />
              </svg>
              Pesan
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`manage-profile/${user?.id_seller}`}
            className={({ isActive }) =>
              `group flex items-center text-sm rounded-lg justify-between cursor-pointer transition-colors duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-gray-500 hover:text-primary"
                  }`
            }
          >
            <span className="flex flex-col items-center">
              <svg
                className="stroke-gray-500 group-hover:stroke-white"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Profile
            </span>
          </NavLink>
        </li>
        <li>
            {modal && (
              <div className='absolute bottom-17 p-2 right-3 bg-gray-50 rounded-lg'>
                <Button
                className="w-full py-1 rounded-xl"
                onClick={() => dispatch(deleteSellerById(user?.id_seller))}
                >
                  Hapus Akun Mitra
                </Button>
                <Button
                  variant="primary"
                  className="w-full text-white py-1 rounded-xl"
                  onClick={() => dispatch(changeAccount({ targetRole: "buyer" }))}
                >
                  Pindah Akun
                </Button>
              </div>
            )}
            <img
              className="w-10 h-10 object-cover rounded-full border-1 border-gray-200 hover:border-primary/30 cursor-pointer"
              src={sellerProfile?.foto_toko}
              alt=""
              onClick={() => setModal(!modal)}
            />
        </li>
      </ul>
    </div>
  )
}

export default BottombarDashboard
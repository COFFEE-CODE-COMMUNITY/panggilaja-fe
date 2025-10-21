import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './page/LandingPage/Index'
import PartnerPage from './page/Partner/Index'
import LoginPage from './page/Login/Index'
import RegisterPage from './page/Register/Index'
import NotFound from './page/NotFound'
import AppLayout from './components/modules/layouts/AppLayout'
import DetailService from './page/DetailService/Index'
import RequestReset from './page/ForgetPass/RequestReset'
import VerifyReset from './page/ForgetPass/VerifyReset'
import PassReset from './page/ForgetPass/PassReset'
import ProfileLayout from './components/modules/layouts/ProfileLayout'
import ProfileIndex from './page/ProfileService/ProfileIndex'
import ProfileReviews from './page/ProfileService/ProfileReviews'
import ProfilePhotos from './page/ProfileService/ProfilePhotos'
import ProfileServices from './page/ProfileService/ProfileServices'
import SearchPage from './page/Search/Index'
import DashboardLayout from './components/modules/layouts/DashboardLayout'
import ManageOrder from './page/Dashboard/ManageOrder'
import ManageServices from './page/Dashboard/ManageServices'
import ManageProfile from './page/Dashboard/ManageProfile'
import AddService from './page/Dashboard/AddService'
import FormAfterRegist from './page/FormDetailProfil/Index'
import Chat from './page/Chat/Index'
import ChatPage from './page/Chat/Index'

const Router = createBrowserRouter([
    {
        path : '/',
        element : <AppLayout/>,
        errorElement : <NotFound/>,
        children : [
            {
                index : true,
                element : <LandingPage/>
            },
            {
                path : 'partner',
                element : <PartnerPage/>
            },
            {
                path : 'service/:id',
                element : <DetailService/>,
            },
            {
                path : 'service/chat/:id',
                element : <ChatPage/>
            },
            {
                path : 'search-result',
                element : <SearchPage/>
            },
            {
                path : 'profile-service/:id',
                element : <ProfileLayout/>,
                children : [
                    {
                        index : true,
                        element : <ProfileIndex/>
                    },
                    {
                        path : 'services',
                        element : <ProfileServices/>
                    },
                    {
                        path : 'reviews',
                        element : <ProfileReviews/>
                    },
                    {
                        path : 'photos',
                        element : <ProfilePhotos/>
                    },
                ]
            },
        ]
    },
    {
        path : 'dashboard',
        element : <DashboardLayout/>,
        children : [
            {
                index : true,
                element : <ManageOrder/>
            },
            {
                path : 'manage-services',
                element : <ManageServices/>,
            },
            {
                path : 'manage-profile',
                element : <ManageProfile/>
            },
            {
                path : 'manage-services/add-service',
                element : <AddService/>
            },
        ]
    },
    {
        path : '/login',
        element : <LoginPage/>
    },
    {
        path : '/register',
        element : <RegisterPage/>
    },
    {
        path : '/form-detail-profile',
        element : <FormAfterRegist/>
    },
    {
        path : '/request-forget-password',
        element : <RequestReset/>
    },
    {
        path : '/verify-forget-password',
        element : <VerifyReset/>
    },
    {
        path : '/reset-forget-password',
        element : <PassReset/>
    },
])

export default Router
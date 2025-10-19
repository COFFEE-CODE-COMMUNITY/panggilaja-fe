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
                element : <DetailService/>
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
        path : '/login',
        element : <LoginPage/>
    },
    {
        path : '/register',
        element : <RegisterPage/>
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
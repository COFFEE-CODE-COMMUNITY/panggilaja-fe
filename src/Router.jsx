import React from 'react'
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
            }
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
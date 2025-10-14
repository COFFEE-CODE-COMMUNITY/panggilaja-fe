import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './page/LandingPage/Index'
import PartnerPage from './page/Partner/Index'
import LoginPage from './page/Login/Index'
import RegisterPage from './page/Register/Index'
import NotFound from './page/NotFound'
import AppLayout from './components/modules/layouts/AppLayout'
import ForgetPassPage from './page/ForgetPass/Index'
import DetailService from './page/DetailService/Index'

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
        path : '/forget-password',
        element : <ForgetPassPage/>
    },
])

export default Router
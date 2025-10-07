import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './page/LandingPage/Index'
import PartnerPage from './page/Partner/Index'
import LoginPage from './page/Login/Index'
import RegisterPage from './page/Register/Index'
import NotFound from './page/NotFound'
import AuthLayout from './components/modules/layouts/AuthLayout'
import AppLayout from './components/modules/layouts/AppLayout'

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
            }
        ]
    },
    {
        element : <AuthLayout/>,
        children : [
            {
                path : '/login',
                element : <LoginPage/>
            },
            {
                path : '/register',
                element : <RegisterPage/>
            },
        ]
    } 
])

export default Router
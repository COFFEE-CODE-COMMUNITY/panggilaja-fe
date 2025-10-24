import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./page/LandingPage/Index";
import PartnerPage from "./page/Partner/Index";
import LoginPage from "./page/Login/Index";
import RegisterPage from "./page/Register/Index";
import NotFound from "./page/NotFound";
import AppLayout from "./components/modules/layouts/AppLayout";
import DetailService from "./page/DetailService/Index";
import RequestReset from "./page/ForgetPass/RequestReset";
import VerifyReset from "./page/ForgetPass/VerifyReset";
import PassReset from "./page/ForgetPass/PassReset";
import ProfileLayout from "./components/modules/layouts/ProfileLayout";
import ProfileIndex from "./page/ProfileService/ProfileIndex";
import ProfileReviews from "./page/ProfileService/ProfileReviews";
import ProfilePhotos from "./page/ProfileService/ProfilePhotos";
import ProfileServices from "./page/ProfileService/ProfileServices";
import SearchPage from "./page/Search/Index";
import DashboardLayout from "./components/modules/layouts/DashboardLayout";
import ManageOrder from "./page/Dashboard/ManageOrder";
import ManageServices from "./page/Dashboard/ManageServices";
import ManageProfile from "./page/Dashboard/ManageProfile";
import AddService from "./page/Dashboard/AddService";
import FormAfterRegist from "./page/FormDetailProfil/Index";
import Chat from "./page/Chat/Index";
import ChatPage from "./page/Chat/Index";
import ProfileSetting from "./page/Setting/ProfileSetting";
import SettingLayout from "./components/modules/layouts/SettingLayout";
import { GuestRoute, HomeRoute, ProtectedRoute } from "./ProtectedRoute";
import ServiceMitraLayout from "./components/modules/layouts/ServiceMitraLayout";
import MitraForm from "./page/MitraForm/Index";
import ProfileMitraForm from "./page/MitraForm/sections/ProfileMitraForm";
import TambahJasaForm from "./page/MitraForm/sections/TambahJasaForm";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <HomeRoute>
            <LandingPage />
          </HomeRoute>
        ),
      },
      {
        path: "about",
        element: <PartnerPage />,
      },
      {
        path: "partner",
        element: (
          <ProtectedRoute>
            <PartnerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "service/:id",
        element: (
          <ProtectedRoute>
            <DetailService />
          </ProtectedRoute>
        ),
      },
      {
        path: "service/chat/:id",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "search-result",
        element: <SearchPage />,
      },
      {
        path: "profile-service/:id",
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfileIndex />,
          },
          {
            path: "services",
            element: <ProfileServices />,
          },
          {
            path: "reviews",
            element: <ProfileReviews />,
          },
          {
            path: "photos",
            element: <ProfilePhotos />,
          },
        ],
      },
      {
        path: "profile-setting",
        element: (
          <ProtectedRoute>
            <SettingLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfileSetting />,
          },
        ],
      },
    ],
  },
  {
    path: "partner/mitra-form",
    element: <ServiceMitraLayout />,
    children: [
      {
        index: true,
        element: <TambahJasaForm />,
      },
      {
        index: '/add-service',
        element: <TambahJasaForm />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ManageOrder />,
      },
      {
        path: "manage-services",
        element: <ManageServices />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
      {
        path: "manage-services/add-service",
        element: <AddService />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/form-detail-profile",
    element: (
      <ProtectedRoute>
        <FormAfterRegist />
      </ProtectedRoute>
    ),
  },
  {
    path: "/request-forget-password",
    element: <RequestReset />,
  },
  {
    path: "/verify-forget-password",
    element: <VerifyReset />,
  },
  {
    path: "/reset-forget-password",
    element: <PassReset />,
  },
]);

export default Router;

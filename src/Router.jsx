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
import DashboardLayout from "./components/modules/layouts/Dashboard/DashboardLayout";
import ManageServices from "./page/Dashboard/ManageServices";
import AddService from "./page/Dashboard/AddService";
import FormAfterRegist from "./page/FormDetailProfil/Index";
import ProfileSetting from "./page/Setting/ProfileSetting";
import SettingLayout from "./components/modules/layouts/SettingLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import ServiceMitraLayout from "./components/modules/layouts/ServiceMitraLayout";
import TambahJasaForm from "./page/MitraForm/sections/TambahJasaForm";
import EditProfile from "./page/Setting/EditProfile";
import SearchAllService from "./page/Search/SearchAllService";
import EditService from "./page/Dashboard/EditService";
import ProfileMitraForm from "./page/MitraForm/sections/ProfileMitraForm";
import GoogleCallback from "./page/Auth/GoogleCallback";
import ManageProfile from "./page/Dashboard/ManageProfile";
import ChatLayout from "./components/modules/layouts/Chat/ChatLayout";
import Test from "./page/Search/Test";
import ManageOrderLayout from "./page/Dashboard/ManageOrderLayout";
import TableAllOrder from "./page/Dashboard/sections/TableAllOrder";
import TableProgressOrder from "./page/Dashboard/sections/TableProgressOrder";
import TableDoneOrder from "./page/Dashboard/sections/TableDoneOrder";
import FavoriteMobile from "./page/Favorite/Index";
import TableIncomingOrder from "./page/Dashboard/sections/TableIncomingOrder";
import FilterByCategory from "./page/Search/FilterByCategory";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <PartnerPage />,
      },
      {
        path: "/favorites",
        element: <FavoriteMobile />,
      },
      {
        path: "partner",
        element: <PartnerPage />,
      },
      {
        path: "service/:id",
        element: <DetailService />,
      },
      {
        path: "search-result",
        element: <SearchPage />,
      },
      {
        path: "category/:id",
        element: <FilterByCategory />,
      },
      {
        path: "all-service-result",
        element: <SearchAllService />,
      },
      {
        path: "profile-service/:id",
        element: <ProfileLayout />,
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
          {
            path: "edit",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:partnerId",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
  },

  {
    path: "partner/mitra-form",
    element: (
      <ProtectedRoute>
        <ServiceMitraLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProfileMitraForm />,
      },
      {
        path: "add-service",
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
        path: "manage-order",
        element: <ManageOrderLayout />,
        children: [
          {
            index: true,
            element: <TableAllOrder />,
          },
          {
            path: "incoming-order",
            element: <TableIncomingOrder />,
          },
          {
            path: "process-order",
            element: <TableProgressOrder />,
          },
          {
            path: "done-order",
            element: <TableDoneOrder />,
          },
        ],
      },
      {
        path: "manage-services",
        element: <ManageServices />,
      },
      {
        path: "manage-profile/:id",
        element: <ProfileLayout />,
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
        path: "chat",
        element: <ChatLayout />,
      },
      {
        path: "chat/:partnerId",
        element: <ChatLayout />,
      },
      {
        path: "manage-services/add-service",
        element: <AddService />,
      },
      {
        path: "manage-services/edit-service/:id",
        element: <EditService />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallback />,
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import EditProfile from "./page/Setting/EditProfile";
import OrderMobile from "./page/Order/OrderMobile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ====== MAIN LAYOUT ====== */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<PartnerPage />} />
          <Route path="favorites" element={<FavoriteMobile />} />
          <Route path="order" element={<OrderMobile />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="service/:id" element={<DetailService />} />
          <Route path="search-result" element={<SearchPage />} />
          <Route path="category/:id" element={<FilterByCategory />} />
          <Route path="all-service-result" element={<SearchAllService />} />

          {/* ====== PROFILE SERVICE ====== */}
          <Route path="profile-service/:id" element={<ProfileLayout />}>
            <Route index element={<ProfileIndex />} />
            <Route path="services" element={<ProfileServices />} />
            <Route path="reviews" element={<ProfileReviews />} />
            <Route path="photos" element={<ProfilePhotos />} />
          </Route>

          <Route
            path="setting"
            element={
              <ProtectedRoute>
                <SettingLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<ProfileSetting />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>

        {/* ====== CHAT SYSTEM ====== */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:partnerId"
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          }
        />

        {/* ====== MITRA FORM ====== */}
        <Route
          path="partner/mitra-form"
          element={
            <ProtectedRoute>
              <ServiceMitraLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileMitraForm />} />
          <Route path="add-service" element={<TambahJasaForm />} />
        </Route>

        {/* ====== DASHBOARD ====== */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="manage-order" element={<ManageOrderLayout />}>
            <Route index element={<TableAllOrder />} />
            <Route path="incoming-order" element={<TableIncomingOrder />} />
            <Route path="process-order" element={<TableProgressOrder />} />
            <Route path="done-order" element={<TableDoneOrder />} />
          </Route>

          <Route path="manage-services" element={<ManageServices />} />
          <Route path="manage-services/add-service" element={<AddService />} />
          <Route path="manage-services/edit-service/:id" element={<EditService />} />

          <Route path="chat" element={<ChatLayout />} />
          <Route path="chat/:partnerId" element={<ChatLayout />} />

          <Route path="manage-profile/:id" element={<ProfileLayout />}>
            <Route index element={<ProfileIndex />} />
            <Route path="services" element={<ProfileServices />} />
            <Route path="reviews" element={<ProfileReviews />} />
            <Route path="photos" element={<ProfilePhotos />} />
          </Route>

        </Route>

        {/* ====== AUTH ====== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/form-detail-profile" element={<ProtectedRoute><FormAfterRegist /></ProtectedRoute>} />

        {/* ====== FORGET PASSWORD ====== */}
        <Route path="/request-forget-password" element={<RequestReset />} />
        <Route path="/verify-forget-password" element={<VerifyReset />} />
        <Route path="/reset-forget-password" element={<PassReset />} />

        {/* ====== OTHER ====== */}
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

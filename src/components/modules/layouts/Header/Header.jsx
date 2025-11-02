import React, { useEffect, useState, useCallback } from "react";
import NavLink from "../navigation/NavLink";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccount,
  logout,
  selectAccessToken,
  selectChangeAccountStatus,
  selectCurrentUser,
} from "../../../features/authSlice";
import {
  FaBars,
  FaRegComment,
  FaRegHeart,
  FaSearch,
  FaTimes,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import {
  getFavoriteService,
  getServices,
  selectAllService,
  selectFavoriteService,
  selectFavoriteServiceStatus,
} from "../../../features/serviceSlice";
import {
  seeProfile,
  selectSeeProfile,
  selectSeeProfileStatus,
} from "../../../features/userSlice";

const Header = ({
  handleChange,
  handleSubmit,
  setSidebarProfile,
  sidebarProfile,
  sidebarMobile,
  setSidebarMobile,
  search,
}) => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const profile = useSelector(selectSeeProfile);
  const statusProfile = useSelector(selectSeeProfileStatus);
  const favorites = useSelector(selectFavoriteService);
  const favoritesStatus = useSelector(selectFavoriteServiceStatus);
  const services = useSelector(selectAllService);
  const statusChange = useSelector(selectChangeAccountStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [favorite, setFavorite] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
  const [iconSearch, setIconSearch] = useState(true);
  const [order, setOrder] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    if (user?.id_buyer && statusProfile === "idle" && !profile) {
      dispatch(seeProfile(user.id_buyer));
    }
  }, [statusProfile, dispatch, user?.id_buyer, profile]);

  // Fetch services and favorites
  useEffect(() => {
    if (!token) {
      setSidebarProfile(false);
    } else {
      dispatch(getFavoriteService(user.id));
    }
    dispatch(getServices());
  }, [token, dispatch, user?.id, setSidebarProfile]);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (sidebarMobile) {
      setSidebarMobile(false);
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Navigate to dashboard on account change
  useEffect(() => {
    if (statusChange === "success") {
      navigate("/dashboard");
    }
  }, [statusChange, navigate]);

  // Calculate favorite services
  const favoritesService =
    favoritesStatus === "success"
      ? services.filter((service, index) => {
          const favoriteItem = favorites.data?.[index];
          return favoriteItem && service.id === favoriteItem.service_id;
        })
      : [];

  // Handlers
  const handleToggleSidebar = useCallback(() => {
    setSidebarProfile((prev) => !prev);
    setFavorite(false);
    setOrder(false);
  }, [setSidebarProfile]);

  const handleToggleMobileSidebar = useCallback(() => {
    setSidebarMobile((prev) => !prev);
    setMobileMenuOpen(false);
  }, [setSidebarMobile]);

  const handleToggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setSidebarMobile(false);
    setSidebarProfile(false);
  }, [setSidebarMobile, setSidebarProfile]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setSidebarMobile(false);
    setMobileMenuOpen(false);
  }, [dispatch, setSidebarMobile]);

  const closeSidebars = useCallback(() => {
    setSidebarMobile(false);
    setSidebarProfile(false);
    setIconSearch(true);
    setMobileMenuOpen(false);
  }, [setSidebarMobile, setSidebarProfile]);

  const closeAllMenus = useCallback(() => {
    setMobileMenuOpen(false);
    setSidebarProfile(false);
  }, [setSidebarProfile]);

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="xl:px-[150px] lg:px-[100px] md:px-[40px] px-[25px] lg:py-5 md:py-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Toggle - For Guest Users */}
            {!token && (
              <button
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleToggleMobileMenu}
                aria-label="Toggle menu"
              >
                {!mobileMenuOpen ? (
                  <FaBars className="text-gray-600 text-lg" />
                ) : (
                  <FaTimes className="text-gray-600 text-lg" />
                )}
              </button>
            )}

            {/* Mobile Menu Toggle - For Logged In Users */}
            {token && (
              <button
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleToggleMobileSidebar}
                aria-label="Toggle menu"
              >
                {!sidebarMobile ? (
                  <FaBars className="text-gray-600 text-lg" />
                ) : (
                  <FaTimes className="text-gray-600 text-lg" />
                )}
              </button>
            )}

            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink
                link="/"
                text="PanggilAja"
                className="md:text-2xl text-xl text-secondary font-bold hover:text-primary transition-colors"
                onClick={closeSidebars}
              />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden sm:flex items-center flex-1 max-w-2xl mx-8">
              <form className="w-full relative" onSubmit={handleSubmit}>
                <div className="relative">
                  <button
                    type="submit"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaSearch size={16} />
                  </button>
                  <Input
                    placeholder="Cari jasa sekarang"
                    className="w-full h-11 pl-12 pr-4 border-2 border-gray-200 rounded-full text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    onChange={handleChange}
                    onFocus={closeSidebars}
                    value={search}
                  />
                </div>
              </form>

              {/* Partner Link */}
              {location.pathname !== "/partner" && (
                <NavLink
                  text="Jadi Mitra"
                  className="ml-4 text-sm md:text-base whitespace-nowrap text-gray-700 hover:text-primary transition-colors font-medium"
                  link="/partner"
                />
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {!token ? (
                <>
                  {/* Desktop Auth Buttons */}
                  <div className="hidden sm:flex items-center gap-3">
                    <NavLink
                      link="/login"
                      className="text-sm md:text-base text-secondary font-semibold hover:text-primary transition-colors"
                      text="Masuk"
                    />
                    <Link to="/register">
                      <Button
                        className="h-9 sm:h-10 md:h-11 px-4 sm:px-6 md:px-8 text-white text-sm md:text-base rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                        variant="primary"
                      >
                        Daftar
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Profile Avatar - Desktop */}
                  <button
                    className="hidden sm:block relative group"
                    onClick={handleToggleSidebar}
                  >
                    <img
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary transition-all cursor-pointer"
                      src={profile?.foto_buyer || "/default-avatar.png"}
                      alt="Profile"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </button>

                  {/* Search Icon - Mobile */}
                  <button
                    className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setSearchMobile(!searchMobile)}
                    aria-label="Search"
                  >
                    {iconSearch && (
                      <MdSearch className="text-gray-600 text-xl" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {searchMobile && (
        <div className="sm:hidden fixed inset-0 bg-white z-50 px-6 py-4">
          <div className="flex items-center gap-4">
            <form className="flex-1" onSubmit={handleSubmit}>
              <Input
                placeholder="Cari jasa terdekat"
                className="w-full h-11 px-4 bg-gray-50 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={handleChange}
                onFocus={closeSidebars}
                value={search}
                autoFocus
              />
            </form>
            <button
              onClick={() => setSearchMobile(false)}
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu for Guest Users */}
      {!token && mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-40 overflow-y-auto pt-16">
          <div className="p-6">
            {/* Search Section */}
            <div className="mb-6">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  setMobileMenuOpen(false);
                }}
              >
                <div className="relative">
                  <FaSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    placeholder="Cari jasa sekarang"
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    onChange={handleChange}
                    value={search}
                  />
                </div>
              </form>
            </div>

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              {location.pathname !== "/partner" && (
                <Link to="/partner" onClick={closeAllMenus}>
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <FaUser className="text-gray-400 text-xl" />
                    <span className="text-base text-gray-700 font-medium">
                      Jadi Mitra
                    </span>
                  </div>
                </Link>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Auth Buttons */}
            <div className="space-y-3">
              <Link to="/login" onClick={closeAllMenus}>
                <Button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all mb-5">
                  Masuk
                </Button>
              </Link>
              <Link to="/register" onClick={closeAllMenus}>
                <Button
                  className="w-full py-4 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                  variant="primary"
                >
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Profile Sidebar */}
      {sidebarProfile && (
        <div className="hidden sm:flex fixed xl:right-[150px] lg:right-[100px] md:right-[40px] right-[25px] lg:top-[90px] md:top-[80px] top-[75px] gap-4 z-40">
          {/* Favorites Panel */}
          {favorite && (
            <div className="w-96 max-h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-800">
                  Jasa Favorit
                </h3>
              </div>
              <div className="overflow-y-auto max-h-80">
                {favoritesService.length > 0 ? (
                  favoritesService.map((favorite) => (
                    <Link
                      key={favorite.id}
                      to={`service/${favorite.id}`}
                      onClick={() => setSidebarProfile(false)}
                    >
                      <div className="flex gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                        <img
                          src={favorite?.foto_product}
                          alt={favorite.nama_jasa}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2">
                            {favorite.nama_jasa}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FaRegHeart className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p className="text-sm">Belum ada favorit</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Profile Menu */}
          <div className="w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <Link to="profile-setting" onClick={() => setSidebarProfile(false)}>
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <img
                  src={profile?.foto_buyer || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500">Konsumen</p>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="py-2">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setFavorite(!favorite);
                  setOrder(false);
                }}
              >
                <FaRegHeart className="text-gray-400 text-base" />
                <span className="text-sm text-gray-700">Favorit</span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setFavorite(false);
                  setOrder(!order);
                }}
              >
                <FaShoppingBag className="text-gray-400 text-base" />
                <span className="text-sm text-gray-700">Pesanan</span>
              </button>

              <Link to="/chat" onClick={() => setSidebarProfile(false)}>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <FaRegComment className="text-gray-400 text-base" />
                  <span className="text-sm text-gray-700">Chat</span>
                </div>
              </Link>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => dispatch(changeAccount())}
              >
                <FaUser className="text-gray-400 text-base" />
                <span className="text-sm text-gray-700">Ganti Akun Seller</span>
              </button>
            </div>

            {/* Logout Button */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors border-t border-gray-100"
              onClick={() => dispatch(logout())}
            >
              <IoMdLogOut className="text-red-500 text-base" />
              <span className="text-sm text-red-600 font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar - Logged In Users */}
      {token && sidebarMobile && (
        <div className="sm:hidden fixed inset-0 bg-white z-40 overflow-y-auto pt-16">
          <div className="p-6">
            {/* Profile Section */}
            <Link to="profile-setting" onClick={closeSidebars}>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <img
                  src={profile?.foto_buyer || "/default-avatar.png"}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.username}
                  </p>
                  <p className="text-sm text-gray-500">Konsumen</p>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              <Link to="/chat" onClick={closeSidebars}>
                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaRegComment className="text-gray-400 text-xl" />
                  <span className="text-base text-gray-700">Pesan</span>
                </div>
              </Link>

              <Link to="/favorite" onClick={closeSidebars}>
                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaRegHeart className="text-gray-400 text-xl" />
                  <span className="text-base text-gray-700">Favorit</span>
                </div>
              </Link>

              {location.pathname !== "/partner" && (
                <Link to="/partner" onClick={closeSidebars}>
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <FaUser className="text-gray-400 text-xl" />
                    <span className="text-base text-gray-700">Jadi Mitra</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Logout Button */}
            <Button
              className="w-full py-4 rounded-xl text-white font-medium hover:shadow-lg transition-all"
              variant="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

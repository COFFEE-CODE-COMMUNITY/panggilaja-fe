import React, { useEffect, useState } from "react";
import NavLink from "../../navigation/NavLink";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccount,
  logout,
  logoutUser,
  resetChangeAccountStatus,
  selectAccessToken,
  selectChangeAccountStatus,
  selectCurrentUser,
  updateProfile,
} from "../../../../features/authSlice";
import {
  FaBars,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaSearch,
  FaShoppingBag,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import {
  deleteFavoriteService,
  getFavoriteService,
  getServices,
  resetDeleteFavoritesStatus,
  selectAllService,
  selectDeleteFavoriteServiceError,
  selectDeleteFavoriteServiceStatus,
  selectFavoriteService,
  selectFavoriteServiceStatus,
} from "../../../../features/serviceSlice";
import {
  seeProfile,
  selectSeeProfile,
  selectSeeProfileStatus,
} from "../../../../features/userSlice";
import {
  selectSearchText,
  setSearchText,
} from "../../../../features/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchText = searchParams.get("q") || "";

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const profile = useSelector(selectSeeProfile);
  const statusProfile = useSelector(selectSeeProfileStatus);
  const searchText = useSelector(selectSearchText);
  const favorites = useSelector(selectFavoriteService);
  const favoritesStatus = useSelector(selectFavoriteServiceStatus);
  const services = useSelector(selectAllService);
  const statusChange = useSelector(selectChangeAccountStatus);
  const deleteFavoriteStatus = useSelector(selectDeleteFavoriteServiceStatus)
  const deleteFavoriteMessage = useSelector(selectDeleteFavoriteServiceError)

  const [sidebarProfile, setSidebarProfile] = useState(false);
  const [sidebarMobile, setSidebarMobile] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [chat, setChat] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false);
  const [iconSearch, setIconSearch] = useState(true);
  const [order, setOrder] = useState(false);
  const [header, setHeader] = useState(true);
  const [search, setSearch] = useState(urlSearchText || searchText);

  useEffect(() => {
    if (statusChange === "success") {
      dispatch(resetChangeAccountStatus());
      navigate("/dashboard/manage-order"); 
    }
  }, [statusChange, dispatch, navigate]);
  
  useEffect(() => {
    setSearch(urlSearchText);
    dispatch(setSearchText(urlSearchText));
  }, [location.search, dispatch]);

  useEffect(() => {
    if (sidebarProfile) {
      setSidebarProfile(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user?.id_buyer && statusProfile === "idle" && !profile) {
      dispatch(seeProfile(user.id_buyer));
    }
  }, [statusProfile, dispatch, user?.id_buyer]);

  useEffect(() => {
    if (!token) {
      setSidebarProfile(false);
    }
    if (token && user?.id) {
      dispatch(getFavoriteService(user.id));
    }
    dispatch(getServices());
  }, [token, user?.id, dispatch]);

  useEffect(() => {
    if (sidebarMobile) {
      setSidebarMobile(false);
    }
  }, [location.pathname]);

  useEffect(() => {
      if (deleteFavoriteStatus === 'success') {            
          if (user?.id) {
              dispatch(getFavoriteService(user.id))
          }
          dispatch(resetDeleteFavoritesStatus())
      } 
  }, [deleteFavoriteStatus, deleteFavoriteMessage, dispatch, user?.id]);

  if (statusChange === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }
  
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHeader(true)
    dispatch(setSearchText(search));
    const targetPath = search
      ? `/search-result?q=${encodeURIComponent(search)}`
      : "/search-result";
    navigate(targetPath);
    setSearchMobile(false)
  };

  let favoritesService = [];

  if (favoritesStatus === "success" && favorites.data && services.length > 0) {
    const favoritedServiceIds = favorites.data.map((fav) => fav.service_id);

  useEffect(() => {
    if (!token) {
      setSidebarProfile(false);
    }
    if (token && user?.id) {
      dispatch(getFavoriteService(user.id));
    }
    dispatch(getServices());
  }, [token, user?.id, dispatch]);

  useEffect(() => {
    if (sidebarMobile) {
      setSidebarMobile(false);
    }
  }, [location.pathname]);

  const statusChange = useSelector(selectChangeAccountStatus);

  if (statusChange === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (statusChange === "success") {
    dispatch(resetChangeAccountStatus());
    navigate("/dashboard");
  }

  let favoritesService = [];

  if (favoritesStatus === "success" && favorites.data && services.length > 0) {
    const favoritedServiceIds = favorites.data.map((fav) => fav.service_id);

    favoritesService = services.filter((service) =>
      favoritedServiceIds.includes(service.id)
    );
  }


  const haveSellerAccount = user?.available_roles?.length > 1;
  return (
    <>
      {header && (
        <header className="sticky top-0 z-110 bg-white shadow-sm border-b border-gray-100">
          <div className="xl:px-[150px] lg:px-[100px] md:px-[40px] px-[25px] lg:py-5 md:py-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile Menu Toggle - For Logged In Users */}
              <button
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSidebarMobile(!sidebarMobile)}
                aria-label="Toggle menu"
              >
                {!sidebarMobile ? (
                  <FaBars className="text-gray-600 text-lg cursor-pointer" />
                ) : (
                  <FaTimes className="text-gray-600 text-lg cursor-pointer" />
                )}
              </button>

              {/* Logo */}
              <div className="flex shrink-0">
                <NavLink
                  link="/"
                  text="PanggilAja"
                  className="md:text-h4 text-h5 text-secondary font-bold"
                  onClick={() => {
                    setSidebarMobile(false);
                    setSidebarProfile(false);
                    setIconSearch(true);
                  }}
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
                      className="w-full h-11 pl-12 pr-4 border-2 border-gray-200 rounded-full text-h5 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      onChange={handleChange}
                      onFocus={() => {
                        setSidebarMobile(false);
                        setSidebarProfile(false);
                      }}
                      value={search}
                    />
                  </div>
                </form>

                {/* Partner Link */}
                {!haveSellerAccount && location.pathname !== "/partner" && (
                  <NavLink
                    text="Jadi Mitra"
                    className="ml-4 text-h5 md:text-base whitespace-nowrap text-gray-700 hover:text-primary transition-colors font-medium"
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
                        className="text-h5 md:text-base text-secondary font-semibold hover:text-primary transition-colors"
                        text="Masuk"
                      />
                      <Link to="/register">
                        <Button
                          className="h-9 sm:h-10 md:h-11 px-4 sm:px-6 md:px-8 text-white text-h5 md:text-base rounded-full font-semibold hover:shadow-lg transition-all duration-300"
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
                    {profile?.foto_buyer ? (
                      <>
                        <button
                          className="hidden sm:block relative group cursor-pointer"
                          onClick={() => {
                            setSidebarProfile(!sidebarProfile);
                            setFavorite(false);
                            setChat(false);
                            setOrder(false);
                          }}
                        >
                          <img
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-1 border-gray-50 group-hover:border-primary transition-all cursor-pointer"
                            src={profile?.foto_buyer || "/default-avatar.png"}
                            alt="Profile"
                          />
                        </button>
                      </>
                    ) : (
                      <button
                        className="hover:bg-white hover:border-gray-100 group hidden sm:block relative group cursor-pointer h-10 w-10 bg-gray-200 rounded-full hover:scale-105 transition-all"
                        onClick={() => {
                          setSidebarProfile(!sidebarProfile);
                          setFavorite(false);
                          setChat(false);
                          setOrder(false);
                        }}
                      >
                        <FaUser className="group-hover:text-primary text-white text-4xl p-1 rounded-full transition-all duration-500" />
                      </button>
                    )}
                  </>
                )}
                <button
                  className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchMobile(!searchMobile);
                    setHeader(false);
                  }}
                  aria-label="Search"
                >
                  {iconSearch && (
                    <MdSearch className="text-gray-600 text-xl" />
                  )}
                </button>
              </div>

            </div>
          </div>
        </header>
      )}

      {searchMobile && (
        <div className="bg-white fixed h-screen top-0 bottom-0 right-0 left-0 px-[25px] py-[10px] sm:hidden z-100">
          <div className="flex gap-[15px] items-center">
            <form className="w-full" onSubmit={handleSubmit}>
              <Input
                placeholder="Cari jasa terdekat"
                className="bg-white rounded-[15px] shadow-sm"
                onChange={handleChange}
                onFocus={() => {
                  setSidebarMobile(false);
                  setSidebarProfile(false);
                }}
                value={search}
              />
            </form>
            <p
              onClick={() => {
                setSearchMobile(false);
                setHeader(true);
              }}
              className="cursor-pointer text-gray-600 hover:text-secondary"
            >
              Close
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu for Guest Users */}
      {!token && sidebarMobile && (
        <div className="sm:hidden fixed inset-0 bg-white z-100 overflow-y-auto pt-16">
          <div className="p-6">
            {/* Search Section */}
            {/* <div className="mb-6">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  setSidebarMobile(false);
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
            </div> */}

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              {location.pathname !== "/partner" && (
                <Link
                  to="/partner"
                  onClick={() => {
                    setSidebarMobile(false);
                  }}
                >
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
              <Link to="/login">
                <Button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all mb-5">
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
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
        <div className="hidden sm:flex fixed xl:right-[150px] lg:right-[100px] md:right-[40px] right-[25px] lg:top-[90px] md:top-[80px] top-[75px] gap-4 z-100">
          {/* Favorites Panel */}
          {favorite && (
            <div className="w-100 max-h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-h5 font-semibold text-gray-800">
                  Jasa Favorit
                </h3>
              </div>
              <div className="overflow-y-auto max-h-80">
                {favoritesService.length > 0 ? (
                  favoritesService.map((favorite) => {
                    const idDelFav = favorites.data.find((service) => service.service_id === favorite.id)
                    return (
                      <div
                        key={favorite.id}
                        className="w-full"
                      >
                        <div className="flex gap-4 p-3 hover:bg-gray-50 transition-colors ">
                          <img
                            src={favorite?.foto_product}
                            alt={favorite.nama_jasa}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex flex-col w-full">
                            <Link 
                              className="text-h5 font-medium text-gray-800 line-clamLink-2 cursor-pointer"
                              to={`service/${favorite.id}`}
                            >
                              {favorite.nama_jasa}
                            </Link>
                            <p className="font-light w-50">{favorite.deskripsi.slice(0,20)}...</p>
                          </div>
                          <div>
                            <FaHeart
                              className="cursor-pointer"
                              onClick={() => dispatch(deleteFavoriteService(idDelFav.id))}
                            />
                          </div>
                        </div>
                      </div>
                  )})
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FaRegHeart className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p className="text-h5">Belum ada favorit</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Profile Menu */}
          <div className="w-64 bg-white shadow-2xl rounded-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <Link to="profile-setting" onClick={() => setSidebarProfile(false)}>
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                {profile?.foto_buyer ? (
                  <img
                    src={profile?.foto_buyer || "/default-avatar.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-10 aspect-square rounded-full bg-gray-200 flex justify-center items-center">
                    <FaUser className="text-2xl text-white"/>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {user?.username}
                  </p>
                  <p className="text-h6 text-gray-500">Konsumen</p>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="py-2">
              <button
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setFavorite(!favorite);
                  setOrder(false);
                }}
              >
                <FaRegHeart className="text-gray-400 text-base" />
                <span className="text-h5 text-gray-700">Favorit</span>
              </button>

              <button
                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setFavorite(false);
                  setOrder(!order);
                }}
              >
                <FaShoppingBag className="text-gray-400 text-base" />
                <span className="text-h5 text-gray-700">Pesanan</span>
              </button>

              <Link
                to="/chat"
                onClick={() => setSidebarProfile(false)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <FaRegComment className="text-gray-400 text-base" />
                  <span className="text-h5 text-gray-700">Chat</span>
                </div>
              </Link>

              {haveSellerAccount && (
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    dispatch(changeAccount({ targetRole: "seller" }))
                  }
                >
                  <FaUser className="text-gray-400 text-base" />
                  <span className="text-h5 text-gray-700">
                    Ganti Akun Seller
                  </span>
                </button>
              )}
            </div>

            {/* Logout Button */}
            <div className="px-3 mb-2">
              <Button
                className="flex justify-center w-full py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all"
                variant="primary"
                onClick={() => {
                  dispatch(logout());
                  setSidebarMobile(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {token && sidebarMobile && (
        <div className="sm:hidden fixed inset-0 bg-white z-10 overflow-y-auto pt-16">
          <div className="p-6">
            <Link
              to="profile-setting"
              onClick={() => {
                setSidebarMobile(false);
              }}
            >
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                {profile?.foto_buyer ? (
                  <img
                    src={profile?.foto_buyer || null}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex justify-center items-center">
                    <FaUser className="text-3xl text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.username}
                  </p>
                  <p className="text-h5 text-gray-500">Konsumen</p>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              <Link to="/chat" onClick={() => setSidebarMobile(false)}>
                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaRegComment className="text-gray-400 text-xl" />
                  <span className="text-base text-gray-700">Pesan</span>
                </div>
              </Link>

              <Link to="/favorites" onClick={() => setSidebarMobile(false)}>
                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaRegHeart className="text-gray-400 text-xl" />
                  <span className="text-base text-gray-700">Favorit</span>
                </div>
              </Link>
              
              {haveSellerAccount && (
                <button
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    dispatch(changeAccount({ targetRole: "seller" }))
                  }
                >
                  <FaUser className="text-gray-400 text-base" />
                  <span className="text-h5 text-gray-700">
                    Ganti Akun Seller
                  </span>
                </button>
              )}

              {!haveSellerAccount && location.pathname !== "/partner" && (
                <Link to="/partner" onClick={() => setSidebarMobile(false)}>
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <FaUser className="text-gray-400 text-xl" />
                    <span className="text-base text-gray-700">Jadi Mitra</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Logout Button */}
            <Button
              className="flex justify-center w-full py-4 rounded-xl text-white font-medium hover:shadow-lg transition-all"
              variant="primary"
              onClick={() => {
                dispatch(logout());
                setSidebarMobile(false);
              }}
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

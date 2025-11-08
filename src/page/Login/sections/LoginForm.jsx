import React, { useEffect, useState } from "react"; // ← Hapus useState, tidak perlu lagi!
import InputForm from "../../../components/modules/form/InputForm";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import {
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAccessToken,
  selectCurrentUser,
  selectLoginError,
  selectLoginMessage,
  selectLoginStatus,
} from "../../../features/authSlice";
import { seeAddress, selectSeeAddress } from "../../../features/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector(selectLoginStatus);
  const message = useSelector(selectLoginMessage);
  const error = useSelector(selectLoginError);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    // Redirect langsung ke backend endpoint untuk Google OAuth
    window.location.replace("https://api.panggilaja.space/auth/google");
  };

  useEffect(() => {
    if (status === "success" && currentUser) {
      navigate("/");
    }
  }, [status, currentUser, navigate]);
  return (
    <div className="flex flex-col gap-4 md:gap-4 h-full">
      {/* Header Section */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <FaShieldAlt className="text-sm" />
          <span>Login Aman & Terpercaya</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Selamat Datang Kembali!
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Masuk untuk melanjutkan ke akun Anda
        </p>
      </div>

      {/* Error Message */}
      {status !== "success" && message && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-red-700 font-medium">{message}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {status === "success" && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-500" size={20} />
            <p className="text-sm text-green-700 font-medium">
              Login berhasil! Mengalihkan...
            </p>
          </div>
        </div>
      )}

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="group w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-white text-gray-700 border-2 border-gray-100 rounded-3xl flex justify-center items-center gap-3 hover:bg-gray-50/50 hover:border-gray-100 hover:shadow-sm transition-all duration-300 "
      >
        <FcGoogle className="text-xl group-hover:scale-110 transition-transform duration-300" />
        <span>Masuk dengan Google</span>
      </Button>

      <div className="relative flex items-center gap-4 my-2">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="text-gray-500 text-sm font-medium bg-white px-2">
          atau
        </span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email Input - SEKARANG MENGGUNAKAN INPUTFORM */}
        <InputForm
          label="Email"
          type="email"
          placeholder="nama@email.com"
          onChange={handleChangeEmail}
          icon={FaEnvelope}
          required={true}
          variant="cols"
        />

        {/* Password Input - SEKARANG MENGGUNAKAN INPUTFORM */}
        <InputForm
          label="Password"
          type="password"
          placeholder="Masukkan password Anda"
          onChange={handleChangePassword}
          icon={FaLock}
          showPasswordToggle={true}
          required={true}
          variant="cols"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-1"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
              Ingat saya
            </span>
          </label>
          <Link to="/request-forget-password">
            <p className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Lupa password?
            </p>
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="group w-full h-12 md:h-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-xl flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 mt-2"
        >
          <span>Masuk Sekarang</span>
        </Button>
      </form>

      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm md:text-base">
          Belum Punya Akun?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

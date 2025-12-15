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
  selectLoginMessage,
  selectLoginStatus,
  resetLoginStatus,
} from "../../../features/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector(selectLoginStatus);
  const message = useSelector(selectLoginMessage);

  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);

  useEffect(() => {
    dispatch(resetLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

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
      {status === "failed" && message && (
        <div className="bg-red-50/50 border border-red-200 p-4 rounded-xl animate-shake shadow-sm mb-2">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-1 bg-red-100 rounded-full mt-0.5">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                Login Gagal
              </h3>
              <p className="text-sm text-red-600 leading-relaxed">
                {message === "Wrong email or password"
                  ? "Email atau password yang Anda masukkan salah. Silakan coba lagi."
                  : message}
              </p>
            </div>
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

import React from "react"; // ← Hapus useState, tidak perlu lagi!
import InputForm from "../../../components/modules/form/InputForm";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import {
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

const LoginForm = ({
  status,
  handleSubmit,
  handleChangeEmail,
  handleChangePassword,
  message,
  handleGoogleLogin,
}) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
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
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-2"
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
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center gap-4 my-2">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="text-gray-500 text-sm font-medium bg-white px-2">
          atau lanjutkan dengan
        </span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="group w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-white text-gray-700 border-2 border-gray-200 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
      >
        <FaGoogle className="text-sky-600 text-xl group-hover:scale-110 transition-transform duration-300" />
        <span>Masuk dengan Google</span>
      </Button>

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm md:text-base">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Daftar Gratis
          </Link>
        </p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-gray-500">
          <FaShieldAlt className="text-green-500" size={16} />
          <span className="text-xs">Aman & Terenkripsi</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <FaCheckCircle className="text-blue-500" size={16} />
          <span className="text-xs">Data Terlindungi</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

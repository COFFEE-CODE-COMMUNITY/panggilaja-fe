import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/modules/layouts/AuthLayout";
import NavLink from "../../components/modules/navigation/NavLink";
import LoginForm from "./sections/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAccessToken,
  selectAuthError,
  selectAuthMessage,
  selectAuthStatus,
  selectCurrentUser,
} from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector(selectAuthStatus);
  const message = useSelector(selectAuthMessage);
  const error = useSelector(selectAuthError);
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
    window.location.href = "http://localhost:5000/auth/google";
  };

  useEffect(() => {
    if (status === "success" && currentUser) {
      navigate("/");
    }
  }, [status, currentUser, navigate]);

  return (
    <AuthLayout
      // title="Masuk ke akun anda"
      // subtitle="Masuk & Dapatkan Jasa Terbaik di Dekat Anda"
      type="Masuk"
      navAuth={
        <p className="text-h6 lg:text-h5 text-primary w-full text-center">
          Tidak punya akun?{" "}
          <NavLink
            className="font-semibold text-primary"
            link="/register"
            text="buat disini"
          />
        </p>
      }
    >
      <LoginForm
        handleSubmit={handleSubmit}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleGoogleLogin={handleGoogleLogin}
        message={message}
        status={status}
      />
    </AuthLayout>
  );
};

export default LoginPage;

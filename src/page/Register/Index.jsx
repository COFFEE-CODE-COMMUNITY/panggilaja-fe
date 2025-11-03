import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/modules/layouts/AuthLayout";
import NavLink from "../../components/modules/navigation/NavLink";
import RegisterForm from "./sections/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  selectAuthMessage,
  selectAuthStatus,
} from "../../features/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const message = useSelector(selectAuthMessage);
  const status = useSelector(selectAuthStatus);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password === confirmPassword) {
      dispatch(registerUser({ username, email, password }));
    }
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/form-detail-profile");
    }
  }, [status]);

  console.log(status);

  return (
    <AuthLayout
      // title='Buat akun baru'
      // subtitle='Daftar & Dapatkan Jasa Terbaik di Dekat Anda'
      type="Daftar"
    >
      <RegisterForm
        handleChangeUsername={handleChangeUsername}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangeConfirmPassword={handleChangeConfirmPassword}
        handleSubmit={handleSubmit}
        message={message}
      />
    </AuthLayout>
  );
};

export default RegisterPage;

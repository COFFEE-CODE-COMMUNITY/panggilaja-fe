import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/modules/layouts/AuthLayout";
import RegisterForm from "./sections/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  selectRegisterMessage,
  selectRegisterStatus,
} from "../../features/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const message = useSelector(selectRegisterMessage);
  const status = useSelector(selectRegisterStatus);

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
      navigate("/login");
    }
  }, [status]);



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

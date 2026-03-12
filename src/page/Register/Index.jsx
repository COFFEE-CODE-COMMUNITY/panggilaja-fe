import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/modules/layouts/AuthLayout";
import RegisterForm from "./sections/RegisterForm";
import { useRegister } from "../../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: register, status: mutationStatus, error } = useRegister();

  const status = mutationStatus === "pending" ? "loading" : mutationStatus;
  const message = error?.response?.data?.message || error?.message || "";

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
      register({ username, email, password });
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

import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/modules/layouts/AuthLayout";
import NavLink from "../../components/modules/navigation/NavLink";
import LoginForm from "./sections/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout type="Masuk">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;

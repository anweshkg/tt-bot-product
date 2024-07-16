"use client";

import { LoginForm } from "@/components/LoginCard";
import { UserContextProvider } from "@/context/UserContext";
import React from "react";

const Login = () => {
  return (
    <UserContextProvider>
      <LoginForm></LoginForm>
    </UserContextProvider>
  );
};

export default Login;

// src/components/LoginForm.tsx

import React, { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Button from "./Button";
import Input from "./Input";
const LoginForm: React.FC = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      setAuthenticated(true);
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Login error", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          margin="normal"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          margin="normal"
          required
        />
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

interface LoginProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!accessCode || !email) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      // Replace this wih your atual AI call
      const response = await fetch("http://20.244.56.144/evaluation-service/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode, email }),
      });
      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        onLogin(data.access_token);
      } else {
        setError("Invalid access code or email.");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={4} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">
          Login to URL Shortener
        </Typography>
        <TextField
          label="Access Code"
          value={accessCode}
          onChange={e => setAccessCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="College Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          type="email"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {token && (
          <Typography color="primary" mt={2}>
            Login successful! Token saved.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;

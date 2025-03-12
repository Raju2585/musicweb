import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerURL } from "../constants";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1db954",
    },
    background: {
      default: "#121212",
      paper: "#181818",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #181818 inset !important",
            WebkitTextFillColor: "#ffffff !important",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  },
});


const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(registerURL, user);
      if (res.data.isSucces) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" color="primary">Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Name" name="name" value={user.name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={user.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Register</Button>
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

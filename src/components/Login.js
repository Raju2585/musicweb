import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginURL } from "../constants";
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


const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(loginURL, user);
      localStorage.setItem("userInfo", JSON.stringify(res.data)); 
      navigate("/dashboard"); 
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mt: 5, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" color="primary">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={user.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

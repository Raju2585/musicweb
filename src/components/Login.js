import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("http://localhost:5000/api/login", user);
      localStorage.setItem("userInfo", JSON.stringify(res.data)); 
      navigate("/dashboard"); 
    } catch (err) {
        console.log(err);
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={user.email} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {/* <Typography sx={{ mt: 2 }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography> */}
      </Box>
    </Container>
  );
};

export default Login;

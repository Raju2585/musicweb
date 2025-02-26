import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("http://localhost:5000/api/register", user);
      if (res.data.isSucces) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs" >
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Name" name="name" value={user.name} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={user.email} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

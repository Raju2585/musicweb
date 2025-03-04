import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Paper, Typography } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import musicBg from "../assets/images/bg-1.jpg";
import musicIcon from "../assets/images/musicImage.jpg";

const Authentication = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        //backgroundImage: 'linear-gradient(to right, #373b44, #4286f4)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={5} sx={{ display: "flex", p: 4, borderRadius: 2, maxWidth: 800, alignItems: "center",background:"transparent" }}>
        {/* Music Icon */}

        {/* Login/Register Tabs */}
        <Box sx={{ flexGrow: 1 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <Box sx={{ p: 2 }}>{tabIndex === 0 ? <Login /> : <Register />}</Box>
        </Box>
        
        <Box sx={{ display: { xs: "none", md: "block" }, mr: 3 }}>
          <img src={musicIcon} alt="Music" style={{ width: 300, height: 300,borderRadius:"50px" }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Authentication;

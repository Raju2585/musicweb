import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import Register from "./Register";
import musicIcon from "../assets/images/musicImage.jpg";

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


const Authentication = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Paper elevation={5} sx={{ display: "flex", p: 4, borderRadius: 2, maxWidth: 800, alignItems: "center", bgcolor: "background.paper" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs 
              value={tabIndex} 
              onChange={handleTabChange} 
              centered 
              textColor="primary" 
              indicatorColor="primary"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <Box sx={{ p: 2 }}>{tabIndex === 0 ? <Login /> : <Register />}</Box>
          </Box>
          
          <Box sx={{ display: { xs: "none", md: "block" }, ml: 3 }}>
            <img src={musicIcon} alt="Music" style={{ width: 300, height: 300, borderRadius: "50px" }} />
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Authentication;

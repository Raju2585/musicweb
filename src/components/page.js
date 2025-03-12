"use client"

import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Navbar from "./navbar"
import TracksSection from "./tracks-section"
import AlbumsSection from "./albums-section"
import LanguageSelection from "./LanguageSelection "
import Admin from "./Admin"

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
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
  },
})


export default function MusicPlayerDashboard() {
  const [activeTab, setActiveTab] = useState("tracks");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); 

  if (!userInfo.languagePreference || userInfo.languagePreference.length === 0) {
    return <LanguageSelection />;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
          {
            activeTab === "tracks" && <TracksSection />
          }
          {
          activeTab === "albums" && <AlbumsSection />
          }
          {
            activeTab==="admin" && userInfo.isAdmin && <Admin/>
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
}


"use client"

import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { TextField } from "@mui/material"

export default function Navbar({ activeTab, setActiveTab }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider", px: { sm: 20, md: 20, lg: 30 } }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Music Player
        </Typography>
        <Box sx={{display:"flex"}}>          
          {!isMobile && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  color: "text.secondary",
                  "&.Mui-selected": { color: "primary.main" },
                },
              }}
            >
              <Tab label="Tracks" value="tracks" />
              <Tab label="Albums" value="albums" />
              {userInfo.isAdmin && <Tab label="Admin" value="admin" />}
            </Tabs>
          )}
        </Box>
      </Toolbar>

      {isMobile && (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              color: "text.secondary",
              "&.Mui-selected": { color: "primary.main" },
            },
          }}
        >
          <Tab label="Tracks" value="tracks" />
          <Tab label="Albums" value="albums" />
        </Tabs>
      )}
    </AppBar>
  )
}


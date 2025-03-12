import React, { useState } from "react";
import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1db954", // Spotify Green
    },
    background: {
      default: "#121212", // Dark mode background
      paper: "#181818", // Slightly lighter for cards
    },
    text: {
      primary: "#ffffff", // White text
    },
  },
});

const languages = ["Telugu", "English", "Hindi", "Marathi", "Kannada", "Malayalam"];

const LanguageSelection = ({ setShowLanguageSelection }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLanguageClick = (language) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [...prevSelected, language]
    );
  };

  const handleSubmit = async () => {
    if (selectedLanguages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(
        "http://localhost:8000/api/addLanguagePreference",
        { languages: selectedLanguages },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      setShowLanguageSelection(false);
    } catch (error) {
      console.error("Error updating language preference:", error);
      alert("Failed to update preference. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          mt: 4,
          textAlign: "center",
          width: "60vw",
          bgcolor: "background.default",
          color: "text.primary",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          Select Your Preferred Languages
        </Typography>

        <Grid2 container spacing={2} p={3} justifyContent="center">
          {languages.map((language, index) => (
            <Grid2 key={index} xs={6} sm={4} md={4} lg={4}>
              <Card
                sx={{
                  borderRadius: 2,
                  width: "15vw",
                  height: "15vw",
                  backgroundColor: selectedLanguages.includes(language)
                    ? "primary.main"
                    : "background.paper",
                  color: selectedLanguages.includes(language)
                    ? "#fff"
                    : "text.primary",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "primary.main", color: "#fff" },
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: selectedLanguages.includes(language)
                    ? "0px 0px 10px rgba(29, 185, 84, 0.6)" // Green glow
                    : "none",
                }}
                onClick={() => handleLanguageClick(language)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{language}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "20%",
            borderRadius: 2,
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "#17a04f" }, 
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Submit Your Preference"}
        </Button>

        {successMessage && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default LanguageSelection;

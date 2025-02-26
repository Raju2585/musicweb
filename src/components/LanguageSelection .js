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

const languages = ["Telugu", "English", "Hindi", "Marathi", "Kannada", "Malayalam"];

const LanguageSelection = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        "http://localhost:5000/api/addLanguagePreference",
        { languages: selectedLanguages },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      setSuccessMessage("Language preference updated successfully! ✅");
    } catch (error) {
      console.error("Error updating language preference:", error);
      alert("Failed to update preference. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center",width:"60vw" }}>
      <Typography variant="h5" gutterBottom>
        Select Your Preferred Languages
      </Typography>

      <Grid2 container spacing={2} p={3} justifyContent="center">
        {languages.map((language,index) => (
          <Grid2 key={index} size={{ xs: 6, sm: 4, md: 4, lg: 4 }}>
            <Card
              sx={{
                borderRadius: 2,
                width: "15vw",
                height: "15vw",
                backgroundColor: selectedLanguages.includes(language) ? "#1976d2" : "#f5f5f5",
                color: selectedLanguages.includes(language) ? "#fff" : "#000",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
                cursor: "pointer",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-around",
                alignItems: "center", 
                textAlign: "center",
              }}
              onClick={() => handleLanguageClick(language)}
            >
              <CardActionArea>
                <CardContent sx={{
                  }}>
                  <Typography  variant="h6">{language}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Button
        variant="contained"
        sx={{ mt: 2, width: "20%", borderRadius: 2 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Submit Your Preference"}
      </Button>

      {successMessage && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
    </Container>
  );
};

export default LanguageSelection;

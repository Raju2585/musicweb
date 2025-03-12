import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Box from "@mui/material/Box";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./audioTag.css";

import { useEffect, useRef, useState } from "react"
import api from "../api-handler/api"
import { CircularProgress, Container, TextField } from "@mui/material"

export default function TracksSection({albumSongs=null}) {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchSong, setSearchSong] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (albumSongs) {
      setSongs(albumSongs);
      setFilteredSongs(albumSongs);
    }
  }, [albumSongs]);
  
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/getSongs");
      if (response.data.isSuccess) {
        setSongs(response.data.songs);
        setFilteredSongs(response.data.songs);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(albumSongs===null)
    {
      fetchSongs();
    }
  }, []);

  const handlePlaySong = (song) => {
    if (currentSong && currentSong._id === song._id) {
      if (audioRef.current?.audio?.current?.paused) {
        audioRef.current.audio.current.play();
      } else {
        audioRef.current.audio.current.pause();
      }
    } else {
      setCurrentSong(song);
    }
  };

  const handleSearchSong = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchSong(searchTerm);

    if (searchTerm === "") {
      setFilteredSongs(songs);
    } else {
      setFilteredSongs(
        songs.filter((song) =>
          song.title.toLowerCase().includes(searchTerm)
        )
      );
    }
  };
  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          position: "fixed",
          width: "61vw",
          top: 0,
          zIndex: 1100,
          bgcolor: "#121212",
          p: 2,
          mt: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2 
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          Tracks
        </Typography>
        <TextField
          label="Search"
          name="Search"
          value={searchSong}
          onChange={handleSearchSong}
          sx={{
            width: "70%",
            maxWidth: "500px", 
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          }}
        />
      </Box>
      {currentSong && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            mb: 4,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            mt: 8
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 250, height: 250, borderRadius: 2, mb: 2 }}
            image={currentSong.songImageUrl}
            alt={currentSong.title}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {currentSong.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentSong.artist}
          </Typography>

          <AudioPlayer
            ref={audioRef}
            src={currentSong.fileUrl}
            showJumpControls={false}
            autoPlay={true}
            layout="horizontal"
            style={{
              backgroundColor: "#121212",
              borderRadius: "10px",
              color: "green",
            }}
          />

        </Box>
      )}
      {
        loading ?
          (
            <CircularProgress />
          ) :
          (
            <Grid container spacing={2} sx={{ mt: 7 }}>
              {filteredSongs.map((song) => (
                <Grid item xs={12} sm={6} md={4} key={song._id}>
                  <Card
                    sx={{
                      bgcolor: "background.paper",
                      cursor: "pointer",
                      "&:hover": {
                        "& .MuiCardMedia-root": {
                          transform: "scale(1.05)",
                          transition: "transform 0.2s ease-in-out",
                        },
                      },
                    }}
                    onClick={() => handlePlaySong(song)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 1,
                            mr: 2,
                            transition: "transform 0.2s ease-in-out",
                          }}
                          image={song.songImageUrl}
                          alt={song.name}
                        />
                        <Box>
                          <Typography variant="subtitle1" component="h3" sx={{ fontWeight: "bold" }}>
                            {song.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {song.album}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {song.artist}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
      }
    </Box>
  )
}


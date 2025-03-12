import { useState, useRef, useEffect } from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { PlayArrow, Pause, VolumeUp } from "@mui/icons-material";

const AudioPlayer = ({ currentSong }) => {
  const audioRef = useRef(new Audio(currentSong.fileUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100);
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
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
      }}
    >
      <img src={currentSong.songImageUrl} alt={currentSong.title} style={{ width: 250, height: 250, borderRadius: 2, marginBottom: 10 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{currentSong.title}</Typography>
      <Typography variant="body2" color="text.secondary">{currentSong.artist}</Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <IconButton onClick={togglePlayPause}>
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </IconButton>

        <Slider 
          value={progress} 
          onChange={(_, newValue) => {
            const newTime = (newValue / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(newValue);
          }} 
          sx={{ width: 150 }} 
        />

        <VolumeUp />
        <Slider 
          value={volume} 
          onChange={(_, newValue) => {
            setVolume(newValue);
            audioRef.current.volume = newValue / 100;
          }} 
          sx={{ width: 100 }} 
        />
      </Box>
    </Box>
  );
};

export default AudioPlayer;

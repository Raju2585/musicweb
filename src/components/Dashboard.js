import { useEffect, useRef, useState } from "react";
import { Container, Tabs, Tab, Card, CardContent, Typography, CircularProgress, Avatar, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import axios from "axios";
import LanguageSelection from "./LanguageSelection ";
import "./dashboard.css"

const Dashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [tabValue, setTabValue] = useState(0);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [showLanguageSelection,setShowLanguageSelection]=useState(true);
    const audioRef = useRef(null);

    const fetchSongs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/getSongs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.isSuccess) {
                setSongs(response.data.songs);

                const uniqueAlbums = {};
                response.data.songs.forEach((song) => {
                    if (song.album && !uniqueAlbums[song.album]) {
                        uniqueAlbums[song.album] = { name: song.album, image: song.albumImage, imageType: song.albumImageType };
                    }
                });
                setAlbums(Object.values(uniqueAlbums));
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);
    console.log(showLanguageSelection);

    if (showLanguageSelection) {
        return <LanguageSelection setShowLanguageSelection={setShowLanguageSelection}/>;
    }

    const handlePlaySong = (song) => {
        if (currentSong && currentSong._id === song._id) {
            audioRef.current.pause();
            setCurrentSong(null);
        }
        else {
            setCurrentSong(song);
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.play();
            }
        }
    };
    return (
        <Container sx={{ mt: 4, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} centered>
                <Tab label="Tracks" />
                <Tab label="Albums" />
            </Tabs>
            {currentSong && (
                <audio ref={audioRef} controls autoPlay style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
                    <source src={`data:${currentSong.fileType};base64,${btoa(
                        new Uint8Array(currentSong.fileData.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                    )}`} type={currentSong.fileType} />
                    Your browser does not support the audio element.
                </audio>
            )}

            {loading ? (
                <CircularProgress sx={{ mt: 3 }} />
            ) : (
                <>
                    {tabValue === 0 && (
                        <Grid2 container spacing={2} p={3} justifyContent="center" sx={{ width: "40vw" }}>
                            {songs.map((song) => (
                                <Grid2 key={song._id} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                    <Card
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: "#f5f5f5",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "left",
                                            px: 2,
                                        }}
                                        onClick={() => handlePlaySong(song)}
                                    >
                                        <Avatar
                                            src={`data:${song.songImageType};base64,${btoa(
                                                new Uint8Array(song.songImage.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                                            )}`}
                                            alt={song.title}
                                            sx={{ width: 56, height: 56, mr: 2 }}
                                        />
                                        <CardContent sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography variant="h6" sx={{ ml: 1, mr: 4 }}>{song.title}</Typography>
                                                    <Box sx={{ display: "flex" }}>
                                                        <Typography variant="h7" sx={{ ml: 1 }}>{song.album}</Typography>,
                                                        <Typography variant="h7" sx={{ ml: 1, mr: 4 }}>{song.artist}</Typography>
                                                    </Box>
                                                </Box>
                                                {currentSong && currentSong._id === song._id && (
                                                    <div className="playing-animation">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* <audio controls style={{ width: "280px" }}>
                                                <source src={`data:${song.fileType};base64,${btoa(
                                                    new Uint8Array(song.fileData.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                                                )}`} type={song.fileType} />
                                                Your browser does not support the audio element.
                                            </audio> */}
                                        </CardContent>

                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    )}

                    {tabValue === 1 && (
                        <Grid2 container spacing={2} p={3} justifyContent="center" sx={{ width: "60vw" }}>
                            {albums.map((album, index) => (
                                <Grid2 key={index} size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                                    <Card sx={{ borderRadius: 2, backgroundColor: "#f5f5f5", cursor: "pointer", p: 2 }}>
                                        <img
                                            src={`data:${album.imageType};base64,${btoa(
                                                new Uint8Array(album.image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
                                            )}`}
                                            alt={album.name}
                                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{album.name}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                </>
            )}
        </Container>
    );
};

export default Dashboard;

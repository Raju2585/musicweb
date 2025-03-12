import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { useEffect, useState } from "react"
import api from "../api-handler/api"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function AlbumsSection() {
  const [albums, setAlbums] = useState([]);
  const navigate=useNavigate();

  const [loading, setLoading] = useState(false);
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const res = await api.get("/getAlbums");
      if (res.data.isSuccess) {
        console.log(res.data)
        setAlbums(res.data.albums);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(
    ()=>{fetchAlbums()},
    []
  );

  const handleAlbumSelect=(albumImage,albumId)=>{
    navigate(`/album/${albumId}`);
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 4 }}>
        Albums
      </Typography>
      {
        loading ?
          (
            <CircularProgress />
          ) :
          (
            <Grid container spacing={3}>
              {albums.map((album) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={album._id}>
                  <Card
                    sx={{
                      bgcolor: "transparent",
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                    onClick={()=>handleAlbumSelect(album.imageUrl,album._id)}
                  >
                    <Box sx={{ position: "relative", mb: 1.5 }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: "100%",
                          aspectRatio: "1/1",
                          borderRadius: 2,
                          boxShadow: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: 6,
                          },
                        }}
                        image={album.imageUrl}
                        alt={album.name}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(0,0,0,0)",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.3)",
                            "& .play-button": {
                              opacity: 1,
                              transform: "translateY(0)",
                            },
                          },
                        }}
                      >
                        <IconButton
                          className="play-button"
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            opacity: 0,
                            transform: "translateY(10px)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "primary.dark",
                              transform: "scale(1.1) translateY(0)",
                            },
                          }}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {album.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {album.artist}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
      }
    </Box>
  )
}


"use client"

import { useState } from "react"
import { TextField, Button, Box, Typography, Container } from "@mui/material"
import api from "../api-handler/api"

export default function Admin() {
    const [songData, setSongData] = useState({
        title: "",
        artist: "",
        album: "",
        genre: "",
        language: "",
        file: null,
        songImage: null,
        albumImage:null
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setSongData({ ...songData, [name]: value })
    }

    const handleFileChange = (e) => {
        setSongData({ ...songData, file: e.target.files[0] })
    }

    const handleSongImageChange = (e) => {
        setSongData({ ...songData, songImage: e.target.files[0] })
    }

    const handleAlbumImageChange = (e) => {
        setSongData({ ...songData, albumImage: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(songData).forEach((key) => {
            formData.append(key, songData[key])
        })

        try {
            const response = await api.post("/addSong", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (response.data.isSuccess) {
                alert("Song added successfully!")
                setSongData({ title: "", artist: "", album: "", genre: "", language: "", file: null, songImage: null })
            }
        } catch (error) {
            console.error("Error adding song:", error)
            alert("Failed to add song")
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                Add New Song
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Title" name="title" value={songData.title} onChange={handleChange} required />
                <TextField label="Artist" name="artist" value={songData.artist} onChange={handleChange} required />
                <TextField label="Album" name="album" value={songData.album} onChange={handleChange} />
                <TextField label="Genre" name="genre" value={songData.genre} onChange={handleChange} />
                <TextField label="Language" name="language" value={songData.language} onChange={handleChange} required />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="outlined" component="label">
                        Upload Song
                        <input type="file" accept="audio/*" hidden onChange={handleFileChange} />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                        {songData?.file?.name || "No file chosen"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="outlined" component="label">
                        Upload Song Image
                        <input type="file" accept="image/*" hidden onChange={handleSongImageChange} />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                    {songData?.songImage?.name || "No file chosen"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="outlined" component="label">
                        Upload Album Image
                        <input type="file" accept="image/*" hidden onChange={handleAlbumImageChange} />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                    {songData?.albumImage?.name || "No file chosen"}
                    </Typography>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Add Song
                </Button>
            </Box>
        </Container>
    )
}

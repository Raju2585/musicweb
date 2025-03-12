import { useEffect, useState } from "react";
import api from "../api-handler/api"
import TracksSection from "./tracks-section";
import { useParams } from "react-router-dom";


const AlbumSongs = () => {
    const { albumId } = useParams();
    const [albumSongs, setAlbumSongs] = useState({ songs: null, albumImage: "" });
    const [loading, setLoading] = useState();
    const fetchAlbumSongs = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/getSongsByAlbumId/${albumId}`);
            console.log(res.data.songs);
            if (res.data.isSuccess) {
                setAlbumSongs({ songs: res.data.songs, albumImage: res.data.albumImage });
            }
        }
        catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAlbumSongs();
    }, [albumId]);

    return (
        <TracksSection albumSongs={albumSongs.songs} />
    )
};

export default AlbumSongs;
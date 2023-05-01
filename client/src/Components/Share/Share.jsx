import React, { useContext } from 'react';
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import ImageIcon from '@mui/icons-material/Image';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import "./Share.scss";
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';

const Share = () => {

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post(`${process.env.REACT_APP_API}/api/upload`, formData, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };


    const { currentUser } = useContext(AuthContext);


    const queryClient = useQueryClient();

    const mutation = useMutation(async (newPost) => {
        setIsLoading(true);
        return await axios.post(`${process.env.REACT_APP_API}/api/post`, newPost, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });

    }, {
        onSuccess: () => {
            // Invalidate and refetch
            setIsLoading(false);
            queryClient.invalidateQueries(["posts"]);
        },
    });


    const handelShare = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        if (!desc) return setErr("Please Write Something");
        mutation.mutate({ desc, image: imgUrl });
        setDesc("");
        setFile(null);
        setErr(null);

    };

    return (


        <div className='share'>
            <div className="s-container">
                <form className="input-field">
                    <Avatar alt="" src={`/uploads/${currentUser?.profilePic}`} />
                    {/* <img src={`/uploads/${currentUser?.profilePic}`} alt="" /> */}
                    <input type="text" name="" id="" placeholder={`Write a Post ${currentUser?.name} !`} onChange={e => setDesc(e.target.value)} required value={desc} />
                    <button type="submit" onClick={handelShare} >
                        {isLoading ? "Sending" : "Send"}</button>
                </form>
                <div className="input-icons">
                    <label htmlFor="file-input">
                        <ImageIcon fontSize='medium' sx={{ color: "#2596be", cursor: "pointer" }} />
                    </label>
                    <input id="file-input" type="file" accept='image/*' onChange={e => setFile(e.target.files[0])} />
                    <AddLocationIcon fontSize='medium' sx={{ color: "#FFA384", cursor: "pointer" }} />
                    <VideoLibraryIcon fontSize='medium' sx={{ color: "", cursor: "pointer" }} />
                </div>
                {err && <span style={{ color: "red", textAlign: "center", display: "block", marginTop: "4px", fontSize: "12px" }}>{err}</span>}
            </div>
        </div>
    );
};

export default Share;
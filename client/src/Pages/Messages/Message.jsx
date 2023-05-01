import { Avatar } from '@mui/material';
import React, { useRef } from 'react';
import "./Message.scss";
import ImageIcon from '@mui/icons-material/Image';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { io } from "socket.io-client";
import { AuthContext } from '../../context/authContext';
import Conversation from '../../Components/Conversation/Conversation';
import { useState } from 'react';
import Messages from '../../Components/Messages/Messages';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Message = () => {

    const [currentChat, setCurrentChat] = useState(null);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketMsg, setSocketMsg] = useState(null);
    const [online, setOnline] = useState([]);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const socket = useRef();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    console.log(location);

    useEffect(() => {
        socket.current = io("ws://localhost:4001");
        socket.current.on("getMessage", data => {
            setSocketMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);


    useEffect(() => {
        socketMsg && currentChat?.members.includes(socketMsg.sender) && setMessages((prev) => [...prev, socketMsg]);
    }, [socketMsg, currentChat]);



    useEffect(() => {
        socket.current.emit("addUser", currentUser._id);
        socket.current.on("getUsers", (users) => {
            setOnline(currentUser.followings.filter((f) => users.some((u) => u.userId === f)));
        });
    }, [currentUser]);



    const scrollRef = useRef();




    const { data } = useQuery(["conversations"], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/conversation/${currentUser._id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        }).then((res) => {
            return res.data;
        })
    );
    const { data: mn } = useQuery(["messages", currentChat?._id], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/message/${currentChat?._id}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        }).then((res) => {
            setMessages(res.data);
            return res.data;
        })
    );




    const queryClient = useQueryClient();

    const mutation = useMutation(async (msg) => {
        setLoading(true);

        return await axios.post(`${process.env.REACT_APP_API}/api/message`, msg, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });

    }, {
        onSuccess: () => {
            setLoading(false);
            // Invalidate and refetch
            queryClient.invalidateQueries(["messages"]);
        },
    });
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    const handelSubmit = (e) => {
        e.preventDefault();
        if (!text) return setErr(true);
        const msg = {
            conversationId: currentChat._id,
            text: text
        };
        const receiverId = currentChat.members.find(member => member !== currentUser._id);
        console.log(receiverId);

        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId: receiverId,
            text: text
        });
        mutation.mutate(msg);
        setText("");
        setErr(false);

    };
    return (
        <div className='messages' >

            <div className="mobile-view">
                <div className="m-icons">
                    {data?.map((c) => (
                        <div onClick={() => setCurrentChat(c)} key={c?._id}>
                            <Conversation conversation={c} currentUser={currentUser} online={online} />
                        </div>
                    ))}


                </div>

            </div>
            {currentChat ?
                <div className="m-container">
                    <div className="m-box">
                        {messages?.map((m) => (
                            <div ref={scrollRef} key={m._id}>
                                < Messages message={m} other={currentUser._id === m.sender} />
                            </div>
                        ))}

                    </div>
                    <div className="type">
                        <form className="type-box">
                            <input type="text" placeholder={err ? "Please Write Something" : `Write some message to  .....`} onChange={(e) => setText(e.target.value)} value={text} />
                            <label htmlFor="file-input">
                                <ImageIcon fontSize='medium' sx={{ color: "#2596be", cursor: "pointer" }} />
                            </label>
                            <input id="file-input" type="file" accept='image/*' disabled />
                            <AddLocationIcon fontSize='medium' sx={{ color: "#FFA384", cursor: "pointer" }} />
                            <VideoLibraryIcon fontSize='medium' sx={{ color: "#2E8BC0", cursor: "pointer" }} />
                            <button type='submit' onClick={handelSubmit}>{loading ? "Sending" : "Send"}</button>
                        </form>
                    </div>
                </div> :
                <span className='warring'>Choose a friend to start Conversation</span>}


        </div>
    );
};

export default Message;
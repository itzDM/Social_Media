import { Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import "./Conversation.scss";


const Conversation = ({ conversation, currentUser, online }) => {



    console.log("Online", online);
    // console.log("Cu", currentUser);

    const friends = conversation.members.find((m) => m !== currentUser._id);
    const { data } = useQuery(["friends", friends], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/user/${friends}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            } }).then((res) => {
            return res.data;
        })
    );
    return (
        <div className="m-icon">
            <div className="avatar">
                <Avatar alt="" src={`/uploads/${data?.profilePic}`} />
                {online.includes(data?._id) === true ? <div className="badge"></div> : ""}
            </div>
            <span>{data?.name}</span>
        </div>
    );
};

export default Conversation;
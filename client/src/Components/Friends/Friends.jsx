import { Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Friends.scss";


const Friends = ({ friendsId }) => {
    const { data } = useQuery(["userInfo", friendsId], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/user/${friendsId}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        }).then((res) => {
            return res.data;
        })
    );
    return (
        <div className='friends'>
            <div className="o-item" >
                <Avatar alt="" src={``} />
                <span className='name'>{data?.userName}</span>
            </div>
            <Link to={`/message/${friendsId}`}><button>Message </button></Link>
        </div>


    );
};

export default Friends;
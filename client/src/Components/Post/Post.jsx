import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import "./Post.scss";
import Comment from '../Comment/Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { Avatar } from '@mui/material';

const Post = ({ post }) => {

    // console.log(post.userId);
    const { currentUser } = useContext(AuthContext);



    // console.log(currentUser._id);
    const [open, setOpen] = useState(false);



    const { data } = useQuery(["userInfo", post.userId], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/user/${post.userId}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        }).then((res) => {
            return res.data;
        })
    );



    const queryClient = useQueryClient();

    const mutation = useMutation(async (id) => {
        return await axios.put(`${process.env.REACT_APP_API}/api/post/like`, { id }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            } });
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
        },
    });






    const handelLike = (e) => {
        e.preventDefault();
        mutation.mutate(post._id);

    };


    return (

        <div className='post'>
            <div className="p-container">
                <div className='user'>
                    <div className="user-cont">
                        <Avatar alt="" src={`/uploads/${data?.profilePic}`} />
                        {/* <img src={`/uploads/${post.profilePic}`} alt="" /> */}
                        <div className="user-detail">
                            <Link to={`/profile/${data?._id}`} style={{ textDecoration: "none" }} >
                                <span className='name'>{data?.name}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                </div>
                <div className='p-container'>
                    <p>{post.desc}</p>
                    <img src={`/uploads/${post.image}`} alt="" />
                </div>
                <div className='bottom'>
                    <div className="item">
                        {post.likes?.includes(currentUser._id) ? <FavoriteIcon sx={{ color: "red" }} onClick={handelLike} /> : <FavoriteBorderIcon onClick={handelLike} />}
                        <span>{post.likes?.length} likes</span>
                    </div>
                    <div className="item" onClick={() => setOpen(!open)}>
                        <MessageIcon />
                        <span>{post.comments?.length}</span>
                    </div>
                    <div className="item">
                        <ShareIcon />
                    </div>
                </div>
                {open && <Comment postId={post._id} />}
            </div>
        </div >
    );
};

export default Post;
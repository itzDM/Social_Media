import React, { useContext, useState } from 'react';
import axios from "axios";
import "./Comment.scss";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';
import { Avatar } from '@mui/material';
const Comment = ({ postId }) => {

    const { currentUser } = useContext(AuthContext);


    const [err, setErr] = useState(null);
    const [desc, setDesc] = useState("");
    const { isLoading, error, data } = useQuery(["comments"], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/comment/${postId}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            } }).then((res) => {
            return res.data;
        })
    );


    const queryClient = useQueryClient();

    const mutation = useMutation(async (comment) => {

        return await axios.post(`${process.env.REACT_APP_API}/api/comment/${postId}`, { comment }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            } });

    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
            queryClient.invalidateQueries(["posts"]);
        },
    });



    const handelComment = async (e) => {
        e.preventDefault();
        if (!desc) return setErr("Please Write Something..");
        mutation.mutate(desc);
        setDesc("");
        setErr(null);
    };
    return (
        <div className='comment'>
            <div className="c-container">
                <div className="input">
                    {/* <img src={`./uploads/${currentUser.profilePic}`} alt="" /> */}
                    <Avatar alt="" src={`/uploads/${currentUser.profilePic}`} />

                    <input type="text" placeholder='Write Message' value={desc} onChange={e => setDesc(e.target.value)} />
                    <button onClick={handelComment} type="submit">Send</button>
                </div>
                {err && <span style={{ color: "red", display: "block", textAlign: "center" }}>{err}</span>}
                {isLoading ? "loading"
                    :
                    data?.map(post => (
                        <div className="c-info" key={post._id} >
                            <div className="u-info">
                                <Avatar alt="" src={`/uploads/${post.userId.profilePic}`} />
                                {/* <img src={`./uploads/${post.profilePic}`} alt="" /> */}
                                <span>{post.userId.name}</span>
                            </div>
                            <div className="message">
                                <p>{post.comment}</p>
                                <span>{moment(post.createdAt).fromNow()}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Comment;
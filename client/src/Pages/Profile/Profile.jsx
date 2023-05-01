import React, { useContext, useEffect, useState } from 'react';
import "./Profile.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Posts from '../../Components/Posts/Posts';
import { AuthContext } from '../../context/authContext';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Update from '../../Components/Update/Update';
import { Avatar } from '@mui/material';
const Profile = () => {


    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const [open, setOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);


    const location = useLocation().pathname;

    const userId = location.split("/")[2];

    const { data } = useQuery(["profile"], async () =>
        await axios.get(`${process.env.REACT_APP_API}/api/user/${userId}`, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        }).then((res) => {
            return res.data;
        })
    );




    const queryClient = useQueryClient();

    const mutation = useMutation(async (followed) => {
        if (followed) return await axios.put(`${process.env.REACT_APP_API}/api/relation/unfollow`, { userId }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        return await axios.put(`${process.env.REACT_APP_API}/api/relation`, { userId }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["profile"]);
            queryClient.invalidateQueries(["posts"]);
        },
    });


    var followed = data?.followers.includes(currentUser._id);


    const handelFollow = async (e) => {
        e.preventDefault();
        mutation.mutate(followed);

    };

    return (
        <div className='profile'>
            <div className="image">
                {data?.coverPic ? <img src={`/uploads/${data?.coverPic}`} className="cover" /> : <img src="https://i.pinimg.com/originals/97/d3/2e/97d32e29723ce78bca289c33d3a9edc9.jpg" className="cover" alt="" />}

                {/* <img src={`/uploads/${data?.profilePic}`} alt=""className='profileImg' /> */}
                <Avatar className='profileImg' alt="" src={`/uploads/${data?.profilePic}`} />
            </div>
            <div className="pf-container">
                <div className="user-p-info">
                    <div className="icons">
                        <div className="icon">
                            <FacebookIcon fontSize='large' sx={{ color: "blue" }} />
                            <InstagramIcon fontSize='large' sx={{ color: "blue" }} />
                            <TwitterIcon fontSize='large' sx={{ color: "blue" }} />
                        </div>
                        {userId === currentUser._id ? <button onClick={() => setOpen(true)} >Update</button> : <button type="submit" onClick={handelFollow}>{followed === true ? "Following" : "Follow"}</button>}

                    </div>
                    <h2 className='name'>{data?.name}</h2>
                </div>
                <Posts userId={userId} />
                {open && <Update setOpen={setOpen} user={data} />}
            </div>
        </div>
    );
};

export default Profile;
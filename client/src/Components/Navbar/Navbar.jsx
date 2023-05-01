import React, { useContext, useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import "./Navbar.scss";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { DarkModeContext } from '../../context/darkModeContext';
import axios from 'axios';

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);

    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState("");
    const [err, setErr] = useState(null);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const { darkMode, toggle } = useContext(DarkModeContext);


    const handelSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/user`, { searchInput }, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
            setData(res.data);
            setOpen(true);
            setErr(null);
        } catch (error) {
            setErr(error.response.data);
            setSearchInput("");
            setOpen(true);

            // console.clear();
        }
    };



    const handelClose = (e) => {
        e.preventDefault();
        setSearchInput("");
        setOpen(false);
        setData(null);
        setErr(null);
    };

    const handelLogout = async (e) => {

        await logout();
        navigate("/login");


    };

    return (

        <nav>
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h2>D-Social</h2>
                    <Diversity2Icon className='logo' fontSize='large' />
                </Link>
                <Link to="/" ><HomeOutlinedIcon /></Link>
                {!darkMode ? <DarkModeOutlinedIcon onClick={toggle} sx={{ cursor: "pointer" }} /> : <WbSunnyIcon onClick={toggle} sx={{ cursor: "pointer" }} />}
                <div className="search">
                    <input type="text" placeholder='Search..' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                    <SearchOutlinedIcon sx={{ cursor: "pointer" }} onClick={handelSearch} />
                </div>
            </div>

            <div className="right">
                <Link to="/message"><EmailOutlinedIcon /></Link>
                <div className="user">
                    <Link to={`/profile/${currentUser._id}`}><Avatar alt="" src={`/uploads/${currentUser?.profilePic}`} /></Link>
                    <span>{currentUser?.userName}</span>

                </div>
                <LogoutIcon sx={{ cursor: "pointer" }} onClick={handelLogout} />

            </div>
            {data &&
                <div className='search-item'>
                    <h4 onClick={handelClose}>X</h4>
                    <div className="user">
                        <Avatar alt="" src={`/uploads/${data?.profilePic}`} />
                        <span>{data?.userName}</span>
                        <button onClick={handelClose}><Link to={`/profile/${data?._id}`}>View</Link></button>
                    </div>
                </div>
            }
            {err &&
                <div className='search-item'>
                    <h4 onClick={handelClose}>X</h4>
                    <div className="user">
                        <span style={{ color: "red" }}>{err}</span>
                    </div>
                </div>
            }

        </nav>


    );
};

export default Navbar;
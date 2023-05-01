import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import "./Update.scss";

const Update = ({ setOpen, user }) => {

    const [newProfilePic, setNewProfilePic] = useState(null);
    const [newCoverPic, setNewCoverPic] = useState(null);

    const [newName, setNewName] = useState("");
    const [err, setErr] = useState(null);



    const queryClient = useQueryClient();



    const mutation = useMutation(async (user) => {
        return await axios.put(`${process.env.REACT_APP_API}/api/user`, user, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });

    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["profile"]);
        },
    });


    const upload = async (file) => {
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

    const handelUpdate = async (e) => {
        e.preventDefault();
        if (newCoverPic || newProfilePic || newName) {
            let coverUrl;
            let profileUrl;
            let name;
            coverUrl = newCoverPic ? await upload(newCoverPic) : user?.coverPic;
            profileUrl = newProfilePic ? await upload(newProfilePic) : user?.profilePic;
            name = newName ? newName : user?.name;

            mutation.mutate({ name, profilePic: profileUrl, coverPic: coverUrl });
            setNewName("");
            setNewCoverPic(null);
            setNewProfilePic(null);
            setErr("Profile Updated, For better View Please ReLogin");
        }
        else {
            setErr("Please Choose Any Field to Update");
        }


    };
    return (
        <div className="update">
            <div className="u-container">
                <form >
                    <h4 onClick={() => setOpen(false)} >X</h4>
                    <h2>Update Profile</h2>
                    <span>Choose Cover Pic.:<input className='inputFile' type="file" name="coverPic" id="" accept='image/*' onChange={e => setNewCoverPic(e.target.files[0])} /></span>
                    <span>Choose A Profile..:<input className='inputFile' type="file" name="profilePic" id="" accept='image/*' onChange={e => setNewProfilePic(e.target.files[0])} /></span>
                    <input type="text" name='userName' placeholder='Write New Name...' onChange={e => setNewName(e.target.value)} />
                    <button type="submit" onClick={handelUpdate}>Update</button>
                    {err && <span style={{ display: "block", textAlign: "center", color: "#ff0000b5" }}>{err}</span>}
                </form>
            </div>
        </div>
    );
};

export default Update;
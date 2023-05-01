import React from 'react';
import Post from "../Post/Post";
import "./Posts.scss";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
const Posts = ({ userId }) => {
  const { data } = useQuery(["posts"], async () =>
    await axios.get(`${process.env.REACT_APP_API}/api/post/timeline/all/${userId}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    }).then((res) => {
      return res.data;
    })
  );


  data?.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });



  return (
    <div className='posts'>
      {data?.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
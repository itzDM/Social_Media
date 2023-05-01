import React, { useContext } from 'react';
import "./RightBar.scss";
import logo from "../../assets/logo.png";
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Friends from '../Friends/Friends';

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.followings);
  const { data } = useQuery(["friends"], async () =>
    await axios.get(`${process.env.REACT_APP_API}/api/user/friends`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    }).then((res) => {
      return res.data;
    })
  );



  return (
    <div className='rightBar'>
      <div className="r-container">
        <div className="online">
          <span className='title'>Friends...</span>
          {data?.map((i) => (<Friends friendsId={i} key={i} />))}
        </div>
        <hr />
        <div className="latest">
          <span className='title'>Latest Conversation....</span>
          <div className="l-item">
            <img src={logo} alt="" />
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, hic?</span>
          </div>
          <div className="l-item">
            <img src={logo} alt="" />
            <span>Lorem ipsum dolor sit amet consectetur adip jhjfhdjf it. Cum, hic?</span>
          </div>
          <div className="l-item">
            <img src={logo} alt="" />
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, hic?</span>
          </div>
        </div>
        <hr />
        <div className="suggestion">
          <span className='title'>Suggestion Friends...</span>
          <div className="s-item">
            <div className="info">
              <img src={logo} alt="" />
              <span className='name'>Avi</span>
            </div>
            <div>
              <button className='f'>Follow</button>
              <button className='d'>Detail</button>
            </div>
          </div>
          <div className="s-item">
            <div className="info">
              <img src={logo} alt="" />
              <span className='name'>Avi</span>
            </div>
            <div>
              <button className='f'>Follow</button>
              <button className='d'>Detail</button>
            </div>
          </div>
          <div className="s-item">
            <div className="info">
              <img src={logo} alt="" />
              <span className='name'>Avi</span>
            </div>
            <div>
              <button className='f'>Follow</button>
              <button className='d'>Detail</button>
            </div>
          </div>
          <div className="s-item">
            <div className="info">
              <img src={logo} alt="" />
              <span className='name'>Avi</span>
            </div>
            <div>
              <button className='f'>Follow</button>
              <button className='d'>Detail</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightBar;;
import React, { useContext } from 'react';
import friend from "../../assets/friend.png";
import group from "../../assets/group.jpg"; 
import "./LeftBar.scss";
import { AuthContext } from '../../context/authContext';
import { Avatar } from '@mui/material';

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);



  return (
    <div className='leftBar'>
      <div className="l-container">
        <div className="items">
          <div className="item">
            <Avatar alt="" src={`/uploads/${currentUser?.profilePic}`} />
            {/* <img src={`/uploads/${currentUser?.profilePic}`} alt="" /> */}
            <span>{currentUser?.name}</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={group} alt="" />
            <span>Groups</span>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
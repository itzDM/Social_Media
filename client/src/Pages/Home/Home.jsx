import React from 'react';
import Stories from '../../Components/Stories/Stories';
import Posts from '../../Components/Posts/Posts';
import "./Home.scss";
import Share from '../../Components/Share/Share';
const Home = () => {

  return (
    <div className='home'>
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
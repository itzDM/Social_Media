import React from 'react';
import "./Stories.scss";
import userImg from "../../assets/user.jfif";
import storyImg from "../../assets/stories.jpg";
const Stories = () => {

    const user = {

        id: 1,
        userName: "DM",
        image: userImg

    };

    const stories = [
        {
            id: 1,
            name: "Sadhu",
            image: storyImg
        },
        {
            id: 2,
            name: "Sadhu",
            image: storyImg
        },
        {
            id: 3,
            name: "Sadhu",
            image: storyImg
        },


    ];

    return (
        <div className='stories'>
            <div className="story">
                <img src={user.image} alt="" />
                <span>{user.userName}</span>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.image} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
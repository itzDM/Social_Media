import React from 'react';
import "./Messages.scss";
import moment from "moment";


const Messages = ({ message, other }) => {
    return (
        <div className='messagesD'>
            <div className={other ? "send other" : "send"}>
                <div className="s-info">
                    <p >{message?.text}</p>
                </div>
                <span>{moment(message?.createdAt).fromNow()}</span>
            </div>
        </div>
    );
};

export default Messages;
import React from "react";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {useTranslation} from "react-i18next";

const HoaxView = (props) => {
    const {hoax} = props;
    const {user, content, timestamp} = hoax;
    const {userName, image} = user;

    const {i18n} = useTranslation();
    
    const relativeTime = format(timestamp, i18n.language);
    return (
        <div className="card p-2 m-3">
            <Link to={`/user/${userName}`} className="text-decoration-none text-dark">
            <div className="card-header light-purple border-0 d-flex">
                <ProfileImage user={user} imagesrc={image} width="48" height="48" />
                <h5 className="flex-fill m-auto p-2">{userName}</h5>
                <span>{relativeTime}</span>
            </div>
            </Link>

            <div className="card-body">
                {content}
            </div>
           
            
        </div>
    );
};

export default HoaxView;
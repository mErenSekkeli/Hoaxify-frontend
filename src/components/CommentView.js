import React from "react";
import ProfileImage from './ProfileImage';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import {useTranslation} from "react-i18next";

const CommentView = (props) => {
    const {content, onClickDelete} = props;
    const {currentUsername} = useSelector((store) => ({currentUsername: store.userName}));
    const {user} = content;
    const isOwner = user.userName === currentUsername;
    const {i18n} = useTranslation();
    const relativeTime = format(content.timestamp, i18n.language);

    return (
        <div key={content.id} className="card mt-2">
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <Link to={`/user/${content.user.userName}`} className="text-decoration-none text-dark d-flex">
                            <ProfileImage className="rounded-circle" width="32" height="32" imagesrc={content.user.image} />
                            <h5 className="card-title mt-1">{content.user.name + " " + content.user.surname}</h5>
                        </Link>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <span className="m-1">{relativeTime}</span>
                        {isOwner &&
                            <span onClick={() => onClickDelete(content.id)} style={{cursor: "pointer"}} className="material-symbols-outlined mt-1">
                            delete
                            </span>
                        } 
                    </div>
                    <p className="card-text">{content.content}</p>
                </div>
            </div>
        </div>
    );
};

export default CommentView;
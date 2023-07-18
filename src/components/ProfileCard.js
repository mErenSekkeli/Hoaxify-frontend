import React, {useState} from "react";
import { useSelector } from "react-redux";
import {withRouter} from "react-router-dom";
import defaultPic from "../user_icon.png";
import ProfileImage from "./ProfileImage.js";
import { t } from "i18next";

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const {username} = useSelector((store) => ({username: store.userName}));
    const {user} = props;
    const {image, name, surname} = user;
    const imageSource = image ? `/images/profile/${image}` : defaultPic;

    const [editMode, setEditMode] = useState(false);

    let message;
    if(pathUsername === username){
        message = "You are viewing your own profile";
    }else{
        message = "You are viewing " + pathUsername + "'s profile";
    }
    console.log(message);
    return (
        <div className="card m-3">
            <div className="card-header text-center">
                <ProfileImage user={user} width="200" height="200" hasShadow={true} />
                <h4>{pathUsername}</h4>
                <a class="btn btn-outline" title={t('Edit')} onClick={() => setEditMode(true)}><i class="material-symbols-outlined">edit</i></a>
            </div>
            <div className="card-body text-center">
                {!editMode && <span className="font-weight-bold">{name} {surname}</span>}
            </div>
        </div>
    );
}
//props is going with the component
export default withRouter(ProfileCard);
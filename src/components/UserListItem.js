import React from "react";
import defaultPic from "../user_icon.png";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage.js";
const UserListItem = (props) => {
    const {user} = props;
    return(
        <Link to={`/user/${user.userName}`} className="list-group-item list-group-item-action">
            <ProfileImage user={user} width="32" height="32" />  
            {user.userName}
        </Link>
      );
}

export default UserListItem;

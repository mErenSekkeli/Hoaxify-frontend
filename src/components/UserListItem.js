import React from "react";
import defaultPic from "../user_icon.png";
import { Link } from "react-router-dom";
const UserListItem = (props) => {
    const {user} = props;
    return(
        <Link to={`/user/${user.userName}`} className="list-group-item list-group-item-action">
            <img className="rounded-circle" alt={user.userName + " Picture"} width="32" height="32" src={(user.image != null) ? user.image : defaultPic } />  
            {user.userName}
        </Link>
      );
}

export default UserListItem;

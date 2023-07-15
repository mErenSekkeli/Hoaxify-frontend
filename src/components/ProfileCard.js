import React from "react";
import { useSelector } from "react-redux";
import {withRouter} from "react-router-dom";

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const {username} = useSelector((store) => ({username: store.userName}));
    let message;
    if(pathUsername === username){
        message = "You are viewing your own profile";
    }else{
        message = "You are viewing " + pathUsername + "'s profile";
    }
    
    return (
        <div>
            {message}
        </div>
    );
}
//props is going with the component
export default withRouter(ProfileCard);
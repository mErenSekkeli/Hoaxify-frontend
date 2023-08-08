import React from "react";
import defaultPic from "../user_icon.png";

const ProfileImage = (props) => {
    const {user, width, height, hasShadow, tempimage, imagesrc} = props;
    const {username} = user ? user : {};
    let imageSource = imagesrc ? 'images/' + imagesrc : defaultPic;
    return(
        <img className={hasShadow ? "rounded-circle m-1 shadow": "rounded-circle m-1"}
         width={width ? width : '32'} 
         height={height ? height : '32'} 
         alt={username ? username + " Picture" : "Profile Picture"} 
         src={tempimage || imageSource} 
         onError={(event) => {
            event.target.src = defaultPic;
         }} />
    );
}

export default ProfileImage;
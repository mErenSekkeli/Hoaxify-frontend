import React from "react";
import defaultPic from "../user_icon.png";

const ProfileImage = (props) => {
    const {user, width, height, hasShadow, tempimage} = props;
    const {image, username} = user;
    let imageSource = image ? 'images/' + image : defaultPic;
    return(
        <img className={hasShadow ? "rounded-circle m-1 shadow": "rounded-circle m-1"}
         width={width ? width : '32'} 
         height={height ? height : '32'} 
         alt={username + " Picture"} 
         src={tempimage || imageSource} 
         onError={(event) => {
            event.target.src = defaultPic;
         }} />
    );
}

export default ProfileImage;
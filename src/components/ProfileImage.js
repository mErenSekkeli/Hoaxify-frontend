import React from "react";
import defaultPic from "../user_icon.png";

const ProfileImage = (props) => {
    const {user, width, height, hasShadow} = props;
    const {image, username} = user;
    let imageSource = image ? image : defaultPic;
    return(
        <img className={hasShadow ? "rounded-circle m-1 shadow": "rounded-circle m-1"} width={width ? width : '32'} height={height ? height : '32'} alt={username + " Picture"} src={imageSource}  />
    );
}

export default ProfileImage;
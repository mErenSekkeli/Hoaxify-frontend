import {React, useState, useEffect} from "react";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {useTranslation} from "react-i18next";
import { useSelector } from "react-redux";
import HoaxDropDownButton from "./HoaxDropDownButton";
import {deleteHoax, likeHoax, unlikeHoax} from "../api/apiCalls";
import { Toast } from "./Toast";
import Spinner from "./Spinner";
import { t } from "i18next";
import CommentModal from "./CommentModal";

const HoaxView = (props) => {
    const {hoax, onDeleteSuccess, isLiked} = props;
    const {user, content, timestamp, fileAttachment } = hoax;
    const {userName, image} = user;
    const {currentUsername} = useSelector((store) => ({currentUsername: store.userName}));
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const {i18n} = useTranslation();
    const isOwner = userName === currentUsername;
    const [isAnimating, setIsAnimating] = useState(isLiked);
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

    useEffect(() => {
        setIsAnimating(isLiked);
    }, [isLiked]);

    const onClickDelete = async () => {
        setPendingApiCall(true);
        try {
            await deleteHoax(hoax.id);
            Toast.fire({
                icon: 'success',
                title: t('Hoax Deleted')
            });
            onDeleteSuccess(hoax.id);
            setPendingApiCall(false);
        } catch (error) {
            setPendingApiCall(false);
            if(error.response.data.status === 403) {
                Toast.fire({
                    icon: 'error',
                    title: t('Access Forbidden')
                });          
            }else {
                Toast.fire({
                    icon: 'error',
                    title: t('Something went wrong')
                });
            }
        }
    };

    const handleHeartClick = async () => {
        setIsAnimating(!isAnimating);
        if(isAnimating) {
            hoax.likeCount -= 1;
            await unlikeTheHoax();
        } else {
            hoax.likeCount += 1;
            await likeTheHoax();
        }
    };

    const likeTheHoax = async () => {
        try {
            const body = {
                username: currentUsername,
                hoaxId: hoax.id
            };
            await likeHoax(hoax.id, body);
        } catch (error) {
            setIsAnimating(false);
            Toast.fire({
                icon: 'error',
                title: t('Something went wrong')
            });
        }
    };

    const unlikeTheHoax = async () => {
        try {
            await unlikeHoax(hoax.id, currentUsername);
        } catch (error) {
            setIsAnimating(true);
            Toast.fire({
                icon: 'error',
                title: t('Something went wrong')
            });
        }
    };


    if(pendingApiCall) {
        return (
            <Spinner />
        );
    }

    const relativeTime = format(timestamp, i18n.language);
    return (
        <div className="card p-2 m-3">
            
            <div className="card-header light-purple border-0">
                <div className="row">
                    <div className="col-6">
                        <Link to={`/user/${userName}`} className="text-decoration-none text-dark d-flex">
                            <ProfileImage user={user} imagesrc={image} width="48" height="48" />
                            <h5 className="flex-fill m-auto p-2">{userName}</h5>
                        </Link>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <span className="m-1">{relativeTime}</span>
                        {isOwner &&
                        <HoaxDropDownButton isOwner={isOwner} usedFunction={onClickDelete} />
                        } 
                    </div>
                </div>
               
            </div>
            
            <div className="card-body">
                {content}
            </div>
            {fileAttachment && (
                <div className="card-footer text-center light-purple">
                    <img className="img-fluid" src={"images/" + fileAttachment.name} alt={fileAttachment.name} style={{ maxHeight: "300px" }} />
                </div>
            )}

            <div className="card-footer" style={{height:"45px"}}>
                <div className="row">
                    <div className="col-6 d-flex">
                        <div onClick={handleHeartClick} className={`heart ${(isAnimating) ? 'is_animating' : ''}`}></div>
                        <span style={{marginTop:"2px"}}>{hoax.likeCount}</span>
                        <span style={{marginTop:"4px", marginLeft:"25px"}} onClick={() => setIsCommentModalVisible(true)} className="comment-button material-symbols-outlined">
                            mode_comment
                        </span><span style={{marginTop:"2px", marginLeft:"20px"}}>{hoax.commentCount}</span>
                    </div>
                    <div className="col-12">
                        {isCommentModalVisible && (
                            <CommentModal show={isCommentModalVisible} onHide={() => setIsCommentModalVisible(false)} hoax={hoax} currentUsername={currentUsername}/>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default HoaxView;
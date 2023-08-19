import {React, useState} from "react";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {useTranslation} from "react-i18next";
import { useSelector } from "react-redux";
import HoaxDropDownButton from "./HoaxDropDownButton";
import {deleteHoax} from "../api/apiCalls";
import { Toast } from "./Toast";
import Spinner from "./Spinner";
import { t } from "i18next";

const HoaxView = (props) => {
    const {hoax, onDeleteSuccess} = props;
    const {user, content, timestamp, fileAttachment } = hoax;
    const {userName, image} = user;
    const {currentUsername} = useSelector((store) => ({currentUsername: store.userName}));
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const {i18n} = useTranslation();
    const isOwner = userName === currentUsername;

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
            
        </div>
    );
};

export default HoaxView;
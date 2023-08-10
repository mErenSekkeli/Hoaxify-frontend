import ButonWithProgress from "./ButtonWithProgress";
import {React, useState} from "react";
import {t} from "i18next";
import {withTranslation} from "react-i18next";
import ProfileImage from "./ProfileImage";
import { useSelector, connect } from "react-redux";
import { postHoax } from "../api/apiCalls";
import { Toast } from "./Toast";

const HoaxSubmit = () => {
    const {username, image} = useSelector((store) => ({
        image: store.image,
        username: store.username
    }));
    const [focused, setFocused] = useState(false);
    const [hoax , setHoax] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const sendHoaxify = async () => {
        const body = {
            content: hoax
        };
        setPendingApiCall(true);
        try {
            await postHoax(username, body);
            setPendingApiCall(false);
            setFocused(false);
            setHoax('');
            Toast.fire({
                icon: 'success',
                title: t('Your Thoughts Are Sent')
            });
        }catch (error) {
            setPendingApiCall(false);
            //get status code 
            var status = error.response.status;
            if(status !== 500){
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.validationErrors.content
                });
            }else {
                Toast.fire({
                    icon: 'error',
                    title: t('Something went wrong')
                });
            }
            
        }
    };

    return (
        <div className={focused ? "light-purple form-group card p-1" : "form-group card p-1"} onFocus={() => setFocused(true)} >
            <ProfileImage user={username} imagesrc={image}  width="64" height="64" />
            <textarea className="form-control" rows={focused ? 3 : 1}
            onChange={(event) => setHoax(event.target.value)} value={hoax}></textarea>
            {focused && 
            <div className="text-end">
                <ButonWithProgress className="btn btn-primary mt-3" pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Send My Thoughts')} redirecting={t('Your Thoughts Are Sending')} onClick={sendHoaxify} />
            </div>}
        </div>
    );
}

const withTranslationHoaxSubmit = withTranslation()(HoaxSubmit);
export default connect()(withTranslationHoaxSubmit);

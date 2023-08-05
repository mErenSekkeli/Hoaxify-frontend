import ButonWithProgress from "./ButtonWithProgress";
import {React, useState} from "react";
import {t} from "i18next";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { postHoax } from "../api/apiCalls";
import Swal from "sweetalert2";

const HoaxSubmit = () => {
    const {username, image} = useSelector((store) => ({
        image: store.image,
        username: store.username
    }));
    const [focused, setFocused] = useState(false);
    const [hoax , setHoax] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
        });

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
            Toast.fire({
                icon: 'error',
                title: error.response.data.validationErrors.content
            });
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

export default HoaxSubmit;
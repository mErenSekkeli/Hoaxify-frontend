import ButonWithProgress from "./ButtonWithProgress";
import {React, useState} from "react";
import {t} from "i18next";
import {withTranslation} from "react-i18next";
import ProfileImage from "./ProfileImage";
import { useSelector, connect } from "react-redux";
import { postHoax, postHoaxAttachment, deleteHoaxAttachment } from "../api/apiCalls";
import { Toast } from "./Toast";
import Spinner from "./Spinner";

const HoaxSubmit = () => {
    const {username, image} = useSelector((store) => ({
        image: store.image,
        username: store.username
    }));
    const [focused, setFocused] = useState(false);
    const [hoax , setHoax] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [filePendingApiCall, setFilePendingApiCall] = useState(false);
    const [newFile, setNewFile] = useState({src: undefined, id: 0, name: undefined});
    const [tempFile, setTempFile] = useState(undefined);

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

    const uploadFile = async (file) => {
        const body = new FormData();
        body.append('file', file);
        setFilePendingApiCall(true);
        try {
            const response = await postHoaxAttachment(username, body);
            Toast.fire({
                icon: 'success',
                title: t('File is uploaded')
            });
            return response.data;
        } catch (error) {
            setFilePendingApiCall(false);
            Toast.fire({
                icon: 'error',
                title: t('Something went wrong')
            });
            return null;
        }
    }

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        if(file === undefined) {
            setNewFile({src: undefined, id: 0, name: undefined});
            
            return;
        }
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(file.name)) {
            Toast.fire({
                icon: 'error',
                title: t('Invalid file type')
            });
          event.target.value = '';
          return;
        }
        
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            setTempFile(fileReader.result);
            try {
                const fileResponse = await uploadFile(file);
                setNewFile({src: fileReader.result, id: fileResponse.id, name: fileResponse.name});
                setFilePendingApiCall(false);
              } catch (error) {
                console.error('Upload failed:', error);
              }
        }
        fileReader.readAsDataURL(file);
    }

    const cancelFile = async () => {
        try {
            setFilePendingApiCall(true);
            const file = {
                id: newFile.id,
                name: newFile.name
            };
            await deleteHoaxAttachment(username, file);
            setFilePendingApiCall(false);
            Toast.fire({
                icon: 'success',
                title: t('File is deleted')
            });
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: t('Something went wrong')
            });
            console.error('Delete failed:', error);
        }
        setTempFile(undefined);
        setNewFile({src: undefined, id: 0, name: undefined});
    }

    if(username === null) {
        return null;
    }

    return (
        <div className={focused ? "light-purple form-group card p-1" : "form-group card p-1"} onFocus={() => setFocused(true)} >
            <ProfileImage user={username} imagesrc={image}  width="64" height="64" />
            <textarea className="form-control" rows={focused ? 3 : 1}
            onChange={(event) => setHoax(event.target.value)} value={hoax}></textarea>
            {focused && 
            <div className="text-end">
                <ButonWithProgress className="btn btn-primary mt-3" pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Send My Thoughts')} redirecting={t('Your Thoughts Are Sending')} onClick={sendHoaxify} />
                <button className="btn btn-outline mt-3 ms-2" onClick={() => document.getElementsByClassName('d-none')[0].click()}><i className="material-symbols-outlined">attach_file</i></button>
                <input type="file" className="d-none" onChange={onChangeFile} />
                {(newFile.src && !filePendingApiCall) && (
                    <div className="position-relative mt-2">
                        <img src={newFile.src} className="img-thumbnail" alt="Hoax Attachment" width={"200"} />
                        <button className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 mt-2 me-2" onClick={cancelFile}>
                        <i className="material-symbols-outlined">clear</i>
                        </button>
                    </div>
                )}
                {(filePendingApiCall) && (
                    <div className="position-relative mt-2">
                        <img src={tempFile} className="img-thumbnail" alt="Hoax Attachment" width={"200"} />
                        <Spinner />
                    </div>
                )}
            </div>}
        </div>
    );
}

const withTranslationHoaxSubmit = withTranslation()(HoaxSubmit);
export default connect()(withTranslationHoaxSubmit);

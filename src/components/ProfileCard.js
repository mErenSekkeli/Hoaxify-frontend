import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {withRouter} from "react-router-dom";
import ProfileImage from "./ProfileImage.js";
import { t } from "i18next";
import Input from "./Input.js";
import { updateUser } from "../api/apiCalls";
import Spinner from "./Spinner";
import ErrorModal from "./ErrorModal";
import { updateSuccess } from "../redux/authActions";
import { Toast } from "./Toast.js";

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const {username} = useSelector((store) => ({username: store.userName}));
    const {user} = props;
    const {image, name, surname} = user;
    const [newName, setNewName] = useState(name);
    const [newSurname, setNewSurname] = useState(surname);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [forbidden, setForbidden] = useState(false);
    const [newImage, setNewImage] = useState(undefined);
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState(image);
    const onClickSave = async() => {
        setPendingApiCall(true);
        if(newName === '' || newSurname === ''){
            setPendingApiCall(false);
            setEditMode(false);
            setNewName(name);
            setNewSurname(surname);
            Toast.fire({
                icon: 'error',
                title: t('Name and surname cannot be empty')
            });
            return;
        }
        const body = {
            name: newName,
            surname: newSurname,
            image: (newImage !== undefined) ? newImage.split(',')[1]: null
        };
        try{
            let response = await updateUser(pathUsername, body);
            
            setNewName(response.data.name);
            setNewSurname(response.data.surname);
            setNewImage(response.data.image);
            setCurrentImage(response.data.image);
            setEditMode(false);
            dispatch(updateSuccess(response.data));
        } catch(error){
            setEditMode(false);
            setValidationErrors(error.response.data.validationErrors);
            Toast.fire({
                icon: 'error',
                title: error.response.data.validationErrors.image
            });
            if(error.response.status === 403){
                setForbidden(true);
            }
        }
    }

    //if editMode is changed, useEffect will be called
    useEffect(() => {
        setPendingApiCall(false);
        setNewImage(undefined);
        //setNewName(name);
        //setNewSurname(surname);  
    }, [editMode]);

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        if(file === undefined) {
            setNewImage(undefined);
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
        fileReader.onloadend = () => {
          setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
      }

    let message;
    if(pathUsername === username){
        message = "You are viewing your own profile";
    }else{
        message = "You are viewing " + pathUsername + "'s profile";
    }
    if(forbidden || validationErrors.length > 0){
        return (
            <ErrorModal t={t} message={'Access Forbidden'} />
        );
    }else {
        return (
            <div className="card mt-3">
                <div className="card-header text-center">
                    <ProfileImage user={user} imagesrc={currentImage} width="200" height="200" hasShadow={true} tempimage={newImage} />
                    <h4>{pathUsername}</h4>
    
                    {(pathUsername === username) && <a className="btn btn-outline" title={t('Edit')} onClick={() => setEditMode(true)}><i className="material-symbols-outlined">edit</i></a>}
                </div>
                 <div className="card-body text-center">
                    {!editMode && <span className="font-weight-bold">{newName} {newSurname}</span>}
    
                    {(pathUsername === username) && <div className="d-flex justify-content-center">
                        {editMode && 
                            <div className="col-6 form-group">
                                {pendingApiCall && <Spinner />}
                                {pendingApiCall && <div className="blur-background"></div>}
                                <Input type="text" name="name" onChange={(e) => setNewName(e.target.value)} label={t('Name')} defaultValue={newName} />
                                <Input type="text" name="surname" onChange={(e) => setNewSurname(e.target.value)} label={t('Surname')} defaultValue={newSurname} />
                                <Input type="file" name="profile-image" onChange={onChangeFile} label={t('Profile Image')} />
                                <button className="btn btn-primary d-inline-flex m-1" onClick={(e) => onClickSave()}><i className="material-symbols-outlined">save</i> {t('Save')}</button>
                                <button className="btn btn-light d-inline-flex m-1" onClick={() => setEditMode(false)}><i className="material-symbols-outlined">cancel</i>{t('Cancel')}</button>
                            </div>
                        }
                    </div>}
                </div>
            </div>
        );
    }
    
}
//props is going with the component
export default withRouter(ProfileCard);
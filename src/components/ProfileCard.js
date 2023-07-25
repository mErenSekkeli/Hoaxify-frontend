import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {withRouter} from "react-router-dom";
import defaultPic from "../user_icon.png";
import ProfileImage from "./ProfileImage.js";
import { t } from "i18next";
import Input from "./Input.js";
import { updateUser } from "../api/apiCalls";
import Spinner from "./Spinner";
import ErrorModal from "./ErrorModal";

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const {username} = useSelector((store) => ({username: store.userName}));
    const {user} = props;
    const {image, name, surname} = user;
    const imageSource = image ? `/images/profile/${image}` : defaultPic;
    const [newName, setNewName] = useState(name);
    const [newSurname, setNewSurname] = useState(surname);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [forbidden, setForbidden] = useState(false);

    const [editMode, setEditMode] = useState(false);
    let isNameChanged = false;
    const onClickSave = async() => {
        setPendingApiCall(true);
        const body = {
            name: newName,
            surname: newSurname
        };
        isNameChanged = true;
        try{
            let response = await updateUser(pathUsername, body);
            setNewName(response.data.name);
            setNewSurname(response.data.surname);
            setEditMode(false);
        } catch(error){
            setEditMode(false);
            if(error.response.status === 403){
                setForbidden(true);
            }
        }
    }

    //if editMode is changed, useEffect will be called
    useEffect(() => {
        setPendingApiCall(false);
        //setNewName(name);
        //setNewSurname(surname);  
    }, [editMode]);

    let message;
    if(pathUsername === username){
        message = "You are viewing your own profile";
    }else{
        message = "You are viewing " + pathUsername + "'s profile";
    }
    if(forbidden){
        return (
            <ErrorModal t={t} message={'Access Forbidden'} />
        );
    }else {
        return (
            <div className="card m-3">
                <div className="card-header text-center">
                    <ProfileImage user={user} width="200" height="200" hasShadow={true} />
                    <h4>{pathUsername}</h4>
    
                    {(pathUsername == username) && <a className="btn btn-outline" title={t('Edit')} onClick={() => setEditMode(true)}><i className="material-symbols-outlined">edit</i></a>}
                </div>
                 <div className="card-body text-center">
                    {!editMode && <span className="font-weight-bold">{newName} {newSurname}</span>}
    
                    {(pathUsername == username) && <div className="d-flex justify-content-center">
                        {editMode && 
                            <div className="col-6 form-group">
                                {pendingApiCall && <Spinner />}
                                {pendingApiCall && <div className="blur-background"></div>}
                                <Input type="text" name="name" onChange={(e) => setNewName(e.target.value)} label={t('Name')} defaultValue={newName} />
                                <Input type="text" name="surname" onChange={(e) => setNewSurname(e.target.value)} label={t('Surname')} defaultValue={newSurname} />
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
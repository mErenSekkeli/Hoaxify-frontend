import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard.js";
import { getUser } from "../api/apiCalls.js";
import { withTranslation } from 'react-i18next';

const UserPage = props => {
    const [user, setUser] = useState();
    const {username} = props.match.params;
    const [notFound, setNotFound] = useState(undefined);
    const {t} = props;

    useEffect(() => {
        setNotFound(undefined);
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
                setNotFound(false);
            }catch (error) {
                if(error.response.status === 404){
                    setNotFound(true);
                }
            }
        };
        loadUser();
    }, [username]);


   if(notFound) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                    <i style={{fontSize: "48px"}} class="material-symbols-outlined">
                        error
                    </i>
                        <h3 style={{fontSize: "48px"}}>{t('Error')}</h3>
                    </div>
                    {t('User not found')}
                </div>
            </div>
        );
   }else if(notFound !== undefined) {
        return (
            <div className="container">
                <ProfileCard user={user} />
            </div>
        );
   }else {
        return (
            <div className='d-flex justify-content-center'>
                <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only"></span>
                </div>
            </div>
        );
   }

}

const UserPageWithTranslation = withTranslation()(UserPage);
export default UserPageWithTranslation;

import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard.js";
import { getUser } from "../api/apiCalls.js";
import { withTranslation } from 'react-i18next';
import Spinner from "../components/Spinner.js";
import HoaxFeed from "../components/HoaxFeed.js";

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
                setNotFound(true);
                
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
                <div className="row">
                    <ProfileCard user={user} />
                </div>
                <div className="row">
                    <div className="p-3">
                        <HoaxFeed userFromUserPage={user} />
                    </div>
                </div>
                
            </div>
        );
   }else {
        return (<Spinner />);
   }

}

const UserPageWithTranslation = withTranslation()(UserPage);
export default UserPageWithTranslation;

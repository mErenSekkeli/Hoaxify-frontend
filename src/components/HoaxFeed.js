import React, {useEffect, useState} from "react";
import { getHoaxes, getNewHoaxesCount, getOldHoaxes, getNewHoaxes } from "../api/apiCalls";
import { t } from "i18next";
import {withTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import { connect } from "react-redux";
import ButtonWithProgress from "./ButtonWithProgress";
import { Toast } from "./Toast";

const HoaxFeed = (props) => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const {content, last} = hoaxPage;
    const {userFromUserPage} = props;
    const [pendingApiCall, setPendingApiCall] = useState(true);
    const [newHoaxCount, setNewHoaxCount] = useState(0);
    let firstHoaxId = 0;

    if(content.length > 0) {
        firstHoaxId = content[0].id;
    }

    const loadOldHoaxes = async() => {
        const lastHoax = content[content.length - 1];
        setPendingApiCall(true);
        try {
            const response = await getOldHoaxes(lastHoax.id, userFromUserPage);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
                }));
            setPendingApiCall(false);
        }catch (error) {
            setPendingApiCall(false);
            Toast.fire({
                icon: t('Error'),
                title: t('Something went wrong')
            });
        }
    };

    const loadNewHoaxes = async () => {

        setPendingApiCall(true);
        try{
            const response = await getNewHoaxes(firstHoaxId, userFromUserPage);
            setHoaxPage(previousHoaxPage => ({
                ...previousHoaxPage,
                content: [...response.data, ...previousHoaxPage.content]
                }));
            setNewHoaxCount(0);
            setPendingApiCall(false);
        } catch(error) {
            setPendingApiCall(false);
            Toast.fire({
                icon: t('Error'),
                title: t('Something went wrong')
            });
        }
    };

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                setPendingApiCall(true);
                const response = await getHoaxes(userFromUserPage, page);
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                    }));
                setPendingApiCall(false);
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
        loadHoaxes();
    }, [userFromUserPage]);


    useEffect(() => {
        
        const getCount = async () => {
            try {
                const response = await getNewHoaxesCount(firstHoaxId, userFromUserPage);
                setNewHoaxCount(response.data.count);
            }catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: t('Something went wrong')
                });
            }
        };
        //this polling is for only development if you want to know if there is any new item then u should use socket.io or something like that
        let looper = setInterval(getCount, 20000);
        return function cleanup() {
            clearInterval(looper);
        };
    }, [firstHoaxId]);


    if(content.length === 0) {
        return <div className="d-flex justify-content-center alert alert-secondary"><i className="material-symbols-outlined">info</i>{t('There are no hoaxes')}</div>
    }

    return (
            <div className="containe">
                <div className="row justify-content-center">
                    {newHoaxCount > 0 && (
                        <ButtonWithProgress className={"btn col-md-3 d-flex justify-content-center gradient-background text-light"} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={(newHoaxCount > 10) ? 10 : newHoaxCount + " " + t('Load New Hoaxes')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => loadNewHoaxes()}></ButtonWithProgress>
                    )}
                </div>
                <div className="row">
                
                <div className="col-md-12">
                    {content.map(hoax => {
                        return <HoaxView key={hoax.id} hoax={hoax} />;
                    }
                    )}
                    {!last && (<ButtonWithProgress className={"btn col-md-12 gradient-background text-light"} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Load More')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => loadOldHoaxes()}></ButtonWithProgress>)}
                </div>
                </div>
            </div>
    );
};

const withTranslationHoaxFeed = withTranslation()(HoaxFeed);
export default connect()(withTranslationHoaxFeed);
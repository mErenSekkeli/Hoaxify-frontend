import React, {useEffect, useState} from "react";
import { getHoaxes } from "../api/apiCalls";
import { t } from "i18next";
import {withTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import { connect } from "react-redux";
import ButtonWithProgress from "./ButtonWithProgress";
import Spinner from "./Spinner";

const HoaxFeed = (props) => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const {content, last, number} = hoaxPage;
    const {userFromUserPage} = props;
    const [pendingApiCall, setPendingApiCall] = useState(true);
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
        }

    };

    useEffect(() => {
        loadHoaxes();
    }, []);

    if(pendingApiCall) {
        return (
            <div className="row">
                <Spinner />
            </div>
        );
    }

    if(content.length === 0) {
        return <div className="d-flex justify-content-center alert alert-secondary"><i className="material-symbols-outlined">info</i>{t('There are no hoaxes')}</div>
    }

    return (
            <div className="row">
                <div className="col-md-12">
                    {content.map(hoax => {
                        return <HoaxView key={hoax.id} hoax={hoax} />;
                    }
                    )}
                    {!last && (<ButtonWithProgress className={"btn col-md-12 gradient-background text-light"} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Load More')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => loadHoaxes(number + 1)}></ButtonWithProgress>)}
                </div>
            </div>
    );
};

const withTranslationHoaxFeed = withTranslation()(HoaxFeed);
export default connect()(withTranslationHoaxFeed);
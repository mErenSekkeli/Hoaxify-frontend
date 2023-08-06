import React, {useEffect, useState} from "react";
import { getHoaxes } from "../api/apiCalls";
import { t } from "i18next";
import {withTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import ButtonWithProgress from "./ButtonWithProgress";

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const {content, last, number} = hoaxPage;
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const loadHoaxes = async (page) => {
        try {
            setPendingApiCall(true);
            const response = await getHoaxes(page);
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

    if(content.length === 0) {
        return <div className="d-flex justify-content-center alert alert-secondary"><i className="material-symbols-outlined">info</i>{t('There are no hoaxes')}</div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    {content.map(hoax => {
                        return <HoaxView key={hoax.id} hoax={hoax} />;
                    }
                    )}
                    {!last && (<ButtonWithProgress className={"btn col-md-12 gradient-background text-light"} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text={t('Load More')} redirecting={t('Loading')} onClick={pendingApiCall ? () => {} : () => loadHoaxes(number + 1)}></ButtonWithProgress>)}
                </div>
            </div>
        </div>
    );
};

const withTranslationHoaxFeed = withTranslation()(HoaxFeed);
export default connect()(withTranslationHoaxFeed);
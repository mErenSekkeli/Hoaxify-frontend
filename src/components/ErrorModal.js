import React from "react";

const ErrorModal = (props) => {
    const {t, message} = props;

    return (
        <div className="container">
            <div className="alert alert-danger text-center">
                <div>
                <i style={{fontSize: "48px"}} className="material-symbols-outlined">
                    error
                </i>
                    <h3 style={{fontSize: "48px"}}>{t('Error')}</h3>
                </div>
                {t(message)}
            </div>
        </div>
    );
}

export default ErrorModal;
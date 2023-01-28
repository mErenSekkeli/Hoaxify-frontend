import React from "react";

const ButtonWithProgress = (props) => {
    const {onClick, pendingApiCall, disabled, text, redirecting} = props;
    return (
        <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
            {(pendingApiCall) && <span className="spinner-grow spinner-grow-sm"></span>}
            {(!pendingApiCall) ? text : redirecting}
        </button>
        
    );
}
export default ButtonWithProgress;
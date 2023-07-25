import React from "react";

const Spinner = () => {
    return (
        <div className='spinner-overlay'>
            <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only"></span>
            </div>
        </div>
    );
}
export default Spinner;
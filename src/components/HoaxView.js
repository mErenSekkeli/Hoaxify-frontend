import React from "react";

const HoaxView = (props) => {
    const {hoax} = props;
    return (
        <div className="card p-2 m-3">
            {hoax.content}
        </div>
    );
};

export default HoaxView;
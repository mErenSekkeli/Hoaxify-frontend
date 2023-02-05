import React from "react";
import ProfileCard from "../components/ProfileCard.js";
import { connect } from "react-redux";
//import { Authentication } from "../shared/AuthenticationContext";

class UserPage extends React.Component {
    //static contextType = Authentication;
    render() {
        const username = this.props.username;
        return (
            <div className="container">
                <ProfileCard username={username} />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        username: store.username
    };
};

export default connect(mapStateToProps)(UserPage);
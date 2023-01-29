import React, { Component } from "react";
import axios from "axios";
//Same Logics For Sign Up and Login Pages

export function withApiProgress(WrappedComponent, path){
    return class extends Component{
        state = {
            pendingApiCall: false
        }

        //this function is called after the component is rendered
        componentDidMount(){
            const {path} = this.props;
            axios.interceptors.request.use(request => {
                if(request.url === path){
                    this.setState({pendingApiCall: true});
                }
                return request;
            });

            axios.interceptors.response.use(response => {
                if(response.config.url === path){
                    this.setState({pendingApiCall: false});
                }
                return response;
            }, error => {
                if(error.config.url === path){
                    this.setState({pendingApiCall: false});
                }
                throw error;
            });
        }

        render(){
            const {pendingApiCall} = this.state;
            return (
                <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
            );
        }
    }
}

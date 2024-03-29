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
            this.requestInterceptor = axios.interceptors.request.use(request => {
                if(request.url.startsWith(path)){
                    this.setState({pendingApiCall: true});
                }
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(response => {
                if(response.config.url.startsWith(path)){
                    this.setState({pendingApiCall: false});
                }
                return response;
            }, error => {
                if(error.config.url.startsWith(path)){
                    this.setState({pendingApiCall: false});
                }
                throw error;
            });
        }

        //It's called before the component is removed from the DOM
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render(){
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;
            return (
                <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
            );
        }
    }
}

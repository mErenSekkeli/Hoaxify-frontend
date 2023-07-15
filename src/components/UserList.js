import React, { Component } from 'react'
import { getAllUsers } from '../api/apiCalls.js';
import { withTranslation } from 'react-i18next';
import UserListItem from './UserListItem.js';
import { withApiProgress } from '../shared/ApiProgress.js';
import { connect } from "react-redux";


class UserList extends Component {

    state = {
        page: {
          content: [],
          size: 10,
          number: 0
        },
        isLoading: false,
        loadingFailure: false
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadPrevious = () => {
        const previousPage = this.state.page.number - 1;
        this.loadUsers(previousPage);
    }

    loadNext = () => {
        const nextPage = this.state.page.number + 1;
        this.loadUsers(nextPage);
    }

    loadUsers = (page) => {
        this.setState({ isLoading: true });
        getAllUsers(page).then(response => {
            this.setState({
                page: response.data,
                isLoading: false
            });
        }).catch(error => {
            this.setState({ loadingFailure: true, isLoading: false });
        });
    }


  render() {
    const {content: users, last, first} = this.state.page;
    const {isLoading, loadingFailure} = this.state;
    const {t, pendingApiCall} = this.props;

    let actionDiv = (
      <div className=''>
            {first === false && <button onClick={this.loadPrevious} className="m-2 btn btn-sm btn-light">{t('Previous')}</button> }
            {last === false && <button onClick={this.loadNext} className="m-2 btn btn-sm btn-light float-end">{t('Next')}</button> }
      </div>
    );

    let loadingDiv = (
      <div className='d-flex justify-content-center'>
        <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only"></span>
        </div>
      </div>
    );

    if(pendingApiCall) {
        actionDiv = loadingDiv;
    }

    if(isLoading && !pendingApiCall) {
        return(
          <div className="container">{loadingDiv}</div>
        );
    }else if(loadingFailure) {
      return(
        <div className="alert alert-danger text-center" role="alert">
          {t('Loading Failure')}
        </div>
      );
    }else {
      return (
        <div className="card">
            <h3 className='card-header text-center'>{t('Users')}</h3>
            <div className="list-group">
              {
                  users.map((user) => {
                      return <UserListItem key={user.userName} user={user} />  //Key must be unique for each element
                  })
              }
            </div>
            {actionDiv}
        </div>
      );
    }
    
  }
}

const temp = withTranslation()(UserList);
const UserListWithApiProgress = withApiProgress(temp, '/api/1.0/usersList?page');

export default connect()(UserListWithApiProgress);

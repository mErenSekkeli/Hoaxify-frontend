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
        }
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
        getAllUsers(page).then(response => {
            this.setState({
                page: response.data
            });
        });
    }


  render() {
    const {content: users, last, first} = this.state.page;
    const {t, pendingApiCall} = this.props;
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
        <div className=''>
            {(first === false && !pendingApiCall) && <button onClick={this.loadPrevious} className="m-2 btn btn-sm btn-light">{t('Previous')}</button> }
            {(last === false && !pendingApiCall) && <button onClick={this.loadNext} className="m-2 btn btn-sm btn-light float-end">{t('Next')}</button> }
        </div>
      </div>
    );
  }
}

const temp = withTranslation()(UserList);
const UserListWithApiProgress = withApiProgress(temp, '/api/1.0/usersList?page');

export default connect()(UserListWithApiProgress);

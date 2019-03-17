import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, message, Layout, Card, Icon, Button, Avatar } from 'antd';
import { and, cond } from 'space-api';

import history from '../../history'
import "./users-list.css";
import { db } from '../../App';

const { Header, Content, Sider } = Layout;
const Search = Input.Search;

class UsersList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <Layout>
        <div class="search-user-wrapper">
          <Search
            className="search-user"
            placeholder="input search text"
            onSearch={value => console.log(value)}
            size="large"
          />
        </div>
        <div>
          {this.props.users.map(obj => <Card className="user-card">{obj.email}</Card>)}
        </div>

      </Layout>
    );
  }
}

export default UsersList;
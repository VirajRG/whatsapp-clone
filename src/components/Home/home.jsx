import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Layout, Menu, Icon, Button, Avatar } from 'antd';
import { and, cond } from 'space-api';

import history from '../../history'
import "./home.css";
import { db } from '../../App';
import UsersList from './users-list';

const { Header, Content, Sider } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', pass: '', users: [] }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    console.log(props.username);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  handleLogin() {
    if (this.state.username == '' || this.state.pass == '') {
      message.error('Username and Password should not be blank');
      return;
    }
  }
  redirectSignup() {
    history.push('/signup');
  }
  componentDidMount() {
    db.get('users').where(and(cond('email','!=',this.props.username))).all().then(res => {
      if (res.status === 200) {
        this.setState({ users: res.data.result});
        console.log(this.state.users)
        return;
      }
    }).catch(ex => {
      // Exception occured while processing request
    });
  }
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo">Whatsapp</div>
          <div className="right-wrapper">
            <a href="https://www.github.com" className="github">Github <Icon type="github" /></a>
            <Button className="space-btn" type="primary">Try SPACE CLOUD</Button>
          </div>

        </Header>
        <Layout>
          <Sider className="custom-sider" width={400} style={{ background: '#fff', height: '100%', position: 'fixed' }}>
            <div className="profile-wrapper">
              <Avatar size="large" style={{ backgroundColor: '#8585c7' }} icon="user" /><br />
              <Icon className="add-friend-icon" type="user-add" /><br />
              <Icon className="setting-icon" type="setting" /><br />
            </div>
            <UsersList {...this.props} users={this.state.users}/>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default Home;